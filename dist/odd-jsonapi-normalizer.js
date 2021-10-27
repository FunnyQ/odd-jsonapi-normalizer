export class JsonapiNormalizer {
    /**
     *Creates an instance of Normalizer.
     */
    constructor(apiDocument) {
        if (apiDocument.data) {
            // ensure type of `this.data` is `Types.JSONAPI.ResourceObject[]`
            this.data = Array.isArray(apiDocument.data) ? apiDocument.data : [apiDocument.data];
        }
        else {
            this.data = [];
        }
        this.includedResources = apiDocument.included || [];
        this.resources = [...this.data, ...this.includedResources];
        this.serverSideSort = {};
        this.entities = {};
        this.meta = apiDocument.meta || {};
    }
    /**
     * short hand for new Normalizer(apiDocument).normalize()
     */
    static normalize(apiDocument) {
        return new this(apiDocument).normalize();
    }
    /**
     * normalizing JSON:API response
     */
    normalize() {
        this.resources.forEach((resource) => {
            this.__recordServerSideSort(resource);
            this.__writeToEntities(resource);
        });
        return {
            entities: this.entities,
            meta: this.meta,
            serverSideSort: this.serverSideSort,
        };
    }
    /**
     * keep server-side sort result by an array of ids
     */
    __recordServerSideSort(resource) {
        if (!this.serverSideSort[resource.type])
            this.serverSideSort[resource.type] = [];
        this.serverSideSort[resource.type].push(resource.id);
    }
    /**
     * record resource into entities object in `entities[type][id]` format.
     * will remove `type` property.
     * relationships will been added as attributes, and each relationship will contain `type` and `id` from JSON:API.
     */
    __writeToEntities(resource) {
        if (!this.entities[resource.type])
            this.entities[resource.type] = {};
        // this.entities[resource.type][resource.id] = Object.assign(
        //   { id: resource.id },
        //   resource.attributes,
        //   this.__relationshipsFrom(resource),
        //   this.__parseApiInfo(resource)
        // )
        this.entities[resource.type][resource.id] = {
            ...{ id: resource.id },
            ...resource.attributes,
            ...this.__relationshipsFrom(resource),
            ...this.__parseApiInfo(resource),
        };
    }
    /**
     * Converting `relationships` in a resource into
     * `{ brand: { type: 'product-brand', id: '1' } }` format.
     * If it is an one-to-many relationship, result will like
     * `{ variants: [{ type: 'product-variants', id: '1' }, { type: 'product-variants', id: '2' }] }`
     */
    __relationshipsFrom(resource) {
        if (!resource.relationships)
            return null;
        let result = {};
        Object.keys(resource.relationships).forEach((relationshipName) => {
            if (resource.relationships)
                result[relationshipName] = resource.relationships[relationshipName].data;
        });
        return result;
    }
    /**
     * save JSON:API resource type and otherinfo in `__apiInfo` attribute.
     */
    __parseApiInfo(resource) {
        let result = {
            __apiInfo: {
                type: resource.type,
                id: resource.id,
            },
        };
        if (resource.hasOwnProperty('links'))
            Object.assign(result.__apiInfo, { links: resource.links });
        if (resource.hasOwnProperty('relationships')) {
            Object.assign(result.__apiInfo, {
                relationships: Object.keys(resource.relationships),
            });
        }
        return result;
    }
}
export default JsonapiNormalizer;
//# sourceMappingURL=odd-jsonapi-normalizer.js.map