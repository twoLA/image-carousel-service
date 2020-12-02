# Group 7 twoLA

SDC Project
Objective: Develop, scale, and optimize inherited legacy application's back-end server and database deployed on AWS EC2
Specifications: documented on gLearn

## Related Projects

  - https://github.com/twoLA/main_gallery_sdc (Adam S.)
  - https://github.com/twoLA/affordability-service (Andy N.)
  - https://github.com/twoLA/reviews (Lillian E.)
  - https://github.com/twoLA/image-carousel-service (Linh D. - this repo)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [CRUD](#CRUD)

## Usage

Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD

1. Create listing & listing's similars
- method: POST
- endpoint: /:id/listing
- request body: {"similar": [
    {
      id: Number,
      price: String,
      size_bd: Number,
      size_ba: Number,
      size_sqft: String,
      address: String,
      neighborhood: String,
      image: String,
      favorite: Boolean,
    },
  ]}
- status codes
  - 201: successfully posted listing
  - 400: unsuccessful attempt due to non-unique id or nonconforming resquest body
2. Get listing's similars
- method: GET
- endpoint: /:id/listing
- response body: [
    {
      id: Number,
      price: String,
      size_bd: Number,
      size_ba: Number,
      size_sqft: String,
      address: String,
      neighborhood: String,
      image: String,
      favorite: Boolean,
    },
  ]
- status codes
  - 200: returns requested listing similars
  - 404: listing not found in database
3. Update listing's similars
- method: PUT
- endpoint: /:id/listing
- request body: {"similar": [
    {
      id: Number,
      price: String,
      size_bd: Number,
      size_ba: Number,
      size_sqft: String,
      address: String,
      neighborhood: String,
      image: String,
      favorite: Boolean,
    },
  ]}
- status codes
  - 201: listing similars has been successfully updated
  - 400: unsuccessful attempt due to nonexistant listing or nonconforming request body
4. Delete a listing & its similars
- method: DELETE
- endpoint: /:id/listing
- status codes
  - 200: listing has been deleted
  - 404: listing not found in database