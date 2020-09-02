import * as JSONAPI from './jsonapi'

export { JSONAPI }

export type ApiInfo = {
  type: string
  id: string
  relationships?: string[]
  relationship?: {
    type: string
    id: string
  } // only for VuexJsonapiAdapter, use as argument to define resource relationship.
  links?: JSONAPI.LinksObject
}
export type NormalizedEntity = {
  id: string
  [attribute: string]: any
  __apiInfo: ApiInfo
}
export type RelationshipAttribute = {
  [relationshipName: string]: JSONAPI.ResourceIdentifierObject | JSONAPI.ResourceIdentifierObject[]
}
export type ServerSideSortData = { [resourceType: string]: string[] }
export type EntitiesData = { [resourceType: string]: { [id: string]: NormalizedEntity } }

export type NormalizedResult = {
  entities: EntitiesData
  meta: JSONAPI.MetaObject
  serverSideSort: ServerSideSortData
}
