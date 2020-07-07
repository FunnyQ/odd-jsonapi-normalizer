/**
 * @see https://jsonapi.org/format/1.0/#document-meta
 */
export type MetaObject = {
  links?: LinksObject
  [propName: string]: any
}

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-attributes
 */
export type AttributesObject = {
  [attrName: string]: any
}

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type LinkObject = {
  href: string
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type Link = string | LinkObject

/**
 * @see https://jsonapi.org/format/1.0/#document-links
 */
export type LinksObject = {
  [linkName: string]: Link
}

/**
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
export type TopLevelLinksObject = {
  self?: Link
  related?: Link
  first?: Link | null
  last?: Link | null
  prev?: Link | null
  next?: Link | null
}

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-identifier-objects
 */
export type ResourceIdentifierObject = {
  id: string
  type: string
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-relationships
 */
export type RelationshipObject = {
  links?: LinksObject
  data: ResourceIdentifierObject | ResourceIdentifierObject[]
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-object-relationships
 */
export type RelationshipsObject = {
  [relationshipName: string]: RelationshipObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-resource-objects
 */
export type ResourceObject = {
  id: string
  type: string
  attributes: AttributesObject
  relationships?: RelationshipsObject
  links?: LinksObject
  meta?: MetaObject
}

/**
 * When sent by the client the id is not required
 *
 * @see https://jsonapi.org/format/1.0/#document-resource-objects
 * @hidden
 */
export type ClientResourceObject = {
  id?: string
  type: string
  attributes?: AttributesObject
  relationships?: RelationshipsObject
  links?: LinksObject
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#error-objects
 */
export type ErrorObject = {
  id?: string
  links?: LinksObject
  status?: string
  code?: string
  title?: string
  detail?: string
  source?: {
    pointer?: string
    parameter?: string
    [propName: string]: any
  }
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-jsonapi-object
 */
export type JsonApiObject = {
  version?: string
  meta?: MetaObject
}

/**
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U
export type JsonApiDocument = XOR<{ data: ResourceObject | ResourceObject[] }, { errors: ErrorObject[] }> & {
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: TopLevelLinksObject
  included?: ResourceObject[]
}

/**
 * @see https://jsonapi.org/format/1.0/#document-top-level
 */
export type ClientJsonApiDocument = {
  data: ClientResourceObject
  included?: ResourceObject[]
}
