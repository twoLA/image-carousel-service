# Group 7 twoLA

SDC Project
Objective: Develop, scale, and optimize inherited legacy application's back-end server and database deployed on AWS EC2\
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
---

### **Create listing**
<span style="color:#006BE6">POST</span> /listing/:id\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `201`: successfully posted listing
  - Failure: `400`: unsuccessful attempt due to non-unique id or nonconforming request body

Request Body: Expects JSON with the following keys
  ```
  {
    "id": "Number",
    "price": "Number",
    "bedrooms": "Number",
    "baths": "Number",
    "sq_footage": "Number",
    "address": "String",
    "neighborhood": "String",
    "image": "String",
  }
  ```
---

### **Get listing's similars**
<span style="color:#006BE6">GET</span> /listing/:id/similars\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `200`: returns requested listing similars in a list
  - Failure: `404`: listing not found in database\

Response Body: Returns JSON
  ```
  [
    {
      "id": "Number",
      "price": "Number",
      "bedrooms": "Number",
      "baths": "Number",
      "sq_footage": "Number",
      "address": "String",
      "neighborhood": "String",
      "image": "String",
      "favorite": "Boolean",
    },
  ]
  ```
---

### **Update listing attribute(s)**
<span style="color:#006BE6">PUT</span> /listing/:id\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `201`: update listing attribute(s)
  - Failure: `400`: unsuccessful attempt due to nonexistant listing or nonconforming request body\

Request Body: Expects JSON with any of the following keys(include only keys to be updated)
  ```
  {
    "id": "Number",
    "price": "Number",
    "bedrooms": "Number",
    "baths": "Number",
    "sq_footage": "Number",
    "address": "String",
    "neighborhood": "String",
    "image": "String",
  }
  ```
---

### **Delete listing**
<span style="color:#006BE6">DELETE</span> /listing/:id\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `204`: listing has been deleted
  - Failure: `404`: listing not found in database