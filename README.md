# odd JSON:API Normalizer

Normalizing [JSON:API](https://jsonapi.org/) spec responses from API server. Converting `data` into entity based structure.

## How to use

```js
import axios from 'axios'
import Normalizer from 'odd-jsonapi_normalizer'

async function fetchProducts() {
  const response = await axios.get('http://api.example.com/products')
  const normalizedResult = Normalizer.normalize(response)

  return normalizedResult
}
```

### About the result

If there is an example response:

```json
{
  "links": {
    "self": "http://example.com/articles",
    "next": "http://example.com/articles?page[offset]=2",
    "last": "http://example.com/articles?page[offset]=10"
  },
  "data": [
    {
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON:API paints my bikeshed!"
      },
      "relationships": {
        "author": {
          "links": {
            "self": "http://example.com/articles/1/relationships/author",
            "related": "http://example.com/articles/1/author"
          },
          "data": { "type": "people", "id": "9" }
        },
        "comments": {
          "links": {
            "self": "http://example.com/articles/1/relationships/comments",
            "related": "http://example.com/articles/1/comments"
          },
          "data": [
            { "type": "comments", "id": "5" },
            { "type": "comments", "id": "12" }
          ]
        }
      },
      "links": {
        "self": "http://example.com/articles/1"
      }
    }
  ],
  "included": [
    {
      "type": "people",
      "id": "9",
      "attributes": {
        "firstName": "Dan",
        "lastName": "Gebhardt",
        "twitter": "dgeb"
      },
      "links": {
        "self": "http://example.com/people/9"
      }
    },
    {
      "type": "comments",
      "id": "5",
      "attributes": {
        "body": "First!"
      },
      "relationships": {
        "author": {
          "data": { "type": "people", "id": "2" }
        }
      },
      "links": {
        "self": "http://example.com/comments/5"
      }
    },
    {
      "type": "comments",
      "id": "12",
      "attributes": {
        "body": "I like XML better"
      },
      "relationships": {
        "author": {
          "data": { "type": "people", "id": "9" }
        }
      },
      "links": {
        "self": "http://example.com/comments/12"
      }
    }
  ],
  "meta": {
    "current_page": 3,
    "per_page": 1,
    "total_pages": 88,
    "total_count": 88
  }
}
```

the normalized result will looks like:

```json
{
  "entities": {
    "articles": {
      "1": {
        "id": "1",
        "title": "JSON:API paints my bikeshed!",
        "author": {
          "type": "people",
          "id": "9"
        },
        "comments": [
          {
            "type": "comments",
            "id": "5"
          },
          {
            "type": "comments",
            "id": "12"
          }
        ],
        "__apiInfo": {
          "type": "articles"
        }
      }
    },
    "people": {
      "9": {
        "id": "9",
        "firstName": "Dan",
        "lastName": "Gebhardt",
        "twitter": "dgeb",
        "__apiInfo": {
          "type": "people"
        }
      }
    },
    "comments": {
      "5": {
        "id": "5",
        "body": "First!",
        "author": {
          "type": "people",
          "id": "2"
        },
        "__apiInfo": {
          "type": "comments"
        }
      },
      "12": {
        "id": "12",
        "body": "I like XML better"
        "author": {
          "type": "people",
          "id": "9"
        },
        "__apiInfo": {
          "type": "comments"
        }
      }
    }
  },
  "meta": {
    "current_page": 3,
    "per_page": 1,
    "total_pages": 88,
    "total_count": 88
  },
  "serverSideSort": {
    "articles": ["1"],
    "people": ["9"],
    "comments": ["5", "12"]
  }
}
```
