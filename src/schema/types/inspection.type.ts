
export const typeDef = `
type Inspection {
  date : String
  followup_required : String
  violations : [Violation]
  type : String
  score : Float
  }
`;
