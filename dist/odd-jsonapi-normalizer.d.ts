import * as Types from '../types';
export declare class JsonapiNormalizer {
    readonly data: Types.JSONAPI.ResourceObject[];
    readonly includedResources: Types.JSONAPI.ResourceObject[];
    readonly resources: Types.JSONAPI.ResourceObject[];
    readonly serverSideSort: Types.ServerSideSortData;
    readonly entities: Types.EntitiesData;
    readonly meta: Types.JSONAPI.MetaObject;
    /**
     *Creates an instance of Normalizer.
     */
    constructor(apiDocument: Types.JSONAPI.JsonApiDocument);
    /**
     * short hand for new Normalizer(apiDocument).normalize()
     */
    static normalize(apiDocument: Types.JSONAPI.JsonApiDocument): Types.NormalizedResult;
    /**
     * normalizing JSON:API response
     */
    private normalize;
    /**
     * keep server-side sort result by an array of ids
     */
    private __recordServerSideSort;
    /**
     * record resource into entities object in `entities[type][id]` format.
     * will remove `type` property.
     * relationships will been added as attributes, and each relationship will contain `type` and `id` from JSON:API.
     */
    private __writeToEntities;
    /**
     * Converting `relationships` in a resource into
     * `{ brand: { type: 'product-brand', id: '1' } }` format.
     * If it is an one-to-many relationship, result will like
     * `{ variants: [{ type: 'product-variants', id: '1' }, { type: 'product-variants', id: '2' }] }`
     */
    private __relationshipsFrom;
    /**
     * save JSON:API resource type and otherinfo in `__apiInfo` attribute.
     */
    private __parseApiInfo;
}
export default JsonapiNormalizer;
//# sourceMappingURL=odd-jsonapi-normalizer.d.ts.map