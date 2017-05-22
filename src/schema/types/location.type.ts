export const typeDef = `
type Location {
  _id: ID
  city:  String
  name:  String
  locality:  String
  url:  String
  type:  String
  last_inspection_date: String
  baseUrl:  String
  address:  String
  inspections: [Inspection]
  inserted: String
  slug:  String
  category: String
  score: Float
  search_name:  String
  vendor_id: String
  guid:  String
  status:  String
  phone:  String
  locality_id: String
  locality_url: String
  vendor_location: String
  geo: Geo
}
`;
