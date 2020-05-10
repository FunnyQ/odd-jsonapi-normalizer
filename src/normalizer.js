export default class Normalizer {
  /**
   *Creates an instance of Normalizer.
   * @param {Object} response response that returned by Axios
   * @memberof Normalizer
   */
  constructor(response) {
    this.data = Array.isArray(response.data) ? response.data : [response.data]
    this.includedResources = response.included || []
    this.resources = [...this.data, ...this.includedResources]
    this.serverSideSort = {}
    this.entities = {}
    this.meta = response.meta
  }

  /**
   * short hand for new Normalizer(response).normalize()
   *
   * @static
   * @param {Object} response response that returned by Axios
   * @returns {Object} { serverSideSort, entities, meta }
   * @memberof Normalizer
   */
  static normalize(response) {
    return new this(response).normalize()
  }

  /**
   * normalizing JSON:API response
   *
   * @returns {Object} { serverSideSort, entities, meta }
   * @memberof Normalizer
   */
  normalize() {
    this.resources.forEach((resource) => {
      this.__recordServerSideSort(resource)
      this.__writeToEntities(resource)
    })

    return {
      entities: this.entities,
      meta: this.meta,
      serverSideSort: this.serverSideSort
    }
  }

  /**
   * keep server-side sort by an array of ids
   *
   * @param {Object} resource JSON:API resource object
   * @memberof Normalizer
   */
  __recordServerSideSort(resource) {
    if (!this.serverSideSort[resource.type]) this.serverSideSort[resource.type] = []

    this.serverSideSort[resource.type].push(resource.id)
  }

  /**
   * record resource into entities object in `entities[type][id]` format.
   * will remove `type` property.
   * relationships will been added as attributes, and each relationship will contain `type` and `id` from JSON:API.
   *
   * @param {Object} resource JSON:API resource object
   * @memberof Normalizer
   */
  __writeToEntities(resource) {
    if (!this.entities[resource.type]) this.entities[resource.type] = {}

    this.entities[resource.type][resource.id] = Object.assign(
      { id: resource.id },
      resource.attributes,
      this.__relationshipsFrom(resource),
      this.__apiData(resource)
    )
  }

  /**
   * Converting `relationships` in a resource into
   * `{ brand: { type: 'product-brand', id: '1' } }` format.
   * If it is an one-to-many relationship, result will like
   * `{ variants: [{ type: 'product-variants', id: '1' }, { type: 'product-variants', id: '2' }] }`
   *
   * @param {Object} resource JSON:API resource object
   * @returns
   * @memberof Normalizer
   */
  __relationshipsFrom(resource) {
    if (!resource.relationships) return null

    let result = {}

    Object.keys(resource.relationships).forEach((relationshipName) => {
      result[relationshipName] = resource.relationships[relationshipName].data
    })

    return result
  }

  /**
   * save JSON:API resource type and otherinfo in `__apiData` attribute.
   *
   * @param {Object} resource JSON:API resource object
   * @returns
   * @memberof Normalizer
   */
  __apiData(resource) {
    let result = {
      __apiInfo: {
        type: resource.type,
        id: resource.id
      }
    }

    if (resource.hasOwnProperty('links')) Object.assign(result.__apiInfo, { links: resource.links })
    if (resource.hasOwnProperty('relationships')) {
      Object.assign(result.__apiInfo, {
        relationships: Object.keys(resource.relationships)
      })
    }
    return result
  }
}
