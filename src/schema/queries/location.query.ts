import { GraphQLList } from 'graphql';
import * as kmeans from 'node-kmeans';
import { mean, meanBy, property } from "lodash";

export const typeDef = `
# Location Querys
type Query {
  getLocationsByCity(city: String): [Location]
  getLocations(maxLat: Float, maxLng: Float, minLat: Float, minLng: Float): [Location]
  getClusters(maxLat: Float, maxLng: Float, minLat: Float, minLng: Float):[Cluster]
}
`;

export const resolver = {
  Query: {
     getLocationsByCity(root, args, ctx) {
       console.log(args);
       return ctx.Locations.find(args).toArray();
     },
     getLocations(root, args, ctx) {
       return ctx.Locations.find({
          $and : [
            {
              $and : [
              {latitude : {$lt:args.maxLat}},
              {latitude: {$gt:args.minLat}}
              ]
            },
            {
              $and : [
              {longitude: {$lt:args.maxLng}},
              {longitude: {$gt:args.minLng}}
              ]
            }
          ]
       }).toArray();
     },
     async getClusters(root, args, ctx){
       let places = await ctx.Locations.find({
          $and : [
            {
              $and : [
              {latitude : {$lt:args.maxLat}},
              {latitude: {$gt:args.minLat}}
              ]
            },
            {
              $and : [
              {longitude: {$lt:args.maxLng}},
              {longitude: {$gt:args.minLng}}
              ]
            }
          ]
       }).toArray();
       let vectors = []
       for(let place of places){
        vectors.push([place.latitude, place.longitude]);
       }
      let formattedClusters = []

      let result = await kmeans.clusterize(vectors, {k: 40},(err,res) => {
          if (err){console.log(err)}
        })
      let groups = result.groups;
      console.log(groups[0].cluster[0])
      let largestCluster = 0;
        for(let group of groups){
          let placeAr = []
          for(let ind of group.clusterInd) {
            placeAr.push(places[ind]);
          }
          let fixedCluster = {
              latitude : group.centroid[0], 
              longitude : group.centroid[1], 
              numberOfPlaces: group.cluster.length,
              radius: 6000 * mean(group.distances),
              averageScore: meanBy(placeAr , property("score")),
              color: '',
              opacity: 0
            };
          if(fixedCluster.averageScore > 90) {
            fixedCluster.color = 'green';
          }else if (fixedCluster.averageScore > 80) {
            fixedCluster.color = 'yellow';
          }else{
            fixedCluster.color = 'red';
          }

          fixedCluster.opacity = fixedCluster.numberOfPlaces / 100;
          if(fixedCluster.opacity > 0.6){
            fixedCluster.opacity = 0.6;
          }else if(fixedCluster.opacity < 0.3){
            fixedCluster.opacity = 0.3;
          }
          formattedClusters.push(fixedCluster);
        }
      console.log(formattedClusters[0]);
      return formattedClusters;
     }
   },
};
