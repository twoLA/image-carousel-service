# twoLA

Real-estate listing application \
This component handles the image carousel that displays similar listings of the current selected listing.

## Related Projects

  - https://github.com/twoLA/main_gallery_sdc
  - https://github.com/twoLA/affordability-service
  - https://github.com/twoLA/reviews
  - https://github.com/twoLA/image-carousel-service (this repo)

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [Dependencies](#dependencies)
1. [Usage](#usage)
1. [API](#api)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).
```
- Node 6.13.0
```

## Development

From within the root directory:
```
'npm react-dev' to start webpack
```

## Dependencies

From within the root directory:

```sh
npm install
```

## Usage

From within the root directory:
```
'npm start' to start server on port 8030
```

## API
### **Create listing's similars**
<span style="color:#006BE6">POST</span> /listing/:id/similars\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `201`: successfully posted listing
  - Failure: `400`: unsuccessful attempt due to non-unique id or nonconforming resquest body

Request Body: Expects JSON with the following keys.
  ```
  { "similar":
    [
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
  }
  ```
---

### **Get listing's similars**
<span style="color:#006BE6">GET</span> /listing/:id/similars\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `200`: returns requested listing similars
  - Failure: `404`: listing not found in database\

Response Body: Returns JSON.
  ```
  [
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
  ```
---

### **Update listing's similars**
<span style="color:#006BE6">PUT</span> /listing/:id/similars\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `201`: listing similars has been successfully updated
  - Failure: `400`: unsuccessful attempt due to nonexistant listing or nonconforming request body\

Request Body: Expects JSON with the following keys (all similars will be replaced with new similar input).
  ```
  { "similar":
    [
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
  }
  ```
---

### **Delete listing's similars**
<span style="color:#006BE6">DELETE</span> /listing/:id/similars\
Path Parameters:
  - `id`: listing id

Status Codes:
  - Success: `200`: listing has been deleted
  - Failure: `404`: listing not found in database
