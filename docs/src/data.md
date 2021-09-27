# Retrieving data

## Getting taxonomic information

```@docs
taxon
```

## Searching for occurrence data

The most common task is to retrieve many occurrences according to a query. The
core type of this package is `GBIFRecord`, which is a very lightweight type
containing information about the query, and a list of `GBIFRecord` for every matching occurrence. Note that the GBIF "search" API is limited to 100000 results, and will not return more than this amount.
### Single occurrence

```@docs
occurrence
```

As an example, we can retrieve the occurrence with the key `1258202889`, using the following code:

```@example
using GBIF
occurrence(1258202889)
```

### Multiple occurrences

```@docs
occurrences()
occurrences(t::GBIFTaxon)
```

When called with no arguments, this function will return a list of the latest 20
occurrences recorded in GBIF. Note that the `GBIFRecords` type, which is the
return type of `occurrences`, implements the iteration interface. For example,
this allows writing the following:

```@example
using GBIF
o = occurrences()
for single_occ in o
  print(single_occ.taxon.name)
end
```

### Query parameters

The queries must be given as pairs of 

```@docs
occurrences(query::Pair...)
occurrences(t::GBIFTaxon, query::Pair...)
```

For example, we can get the data on observations of bats between -30 and 30 of
latitude using the following syntax:

```@example
using GBIF
bats = GBIF.taxon("Chiroptera"; rank=:ORDER)
for occ in occurrences(bats, "decimalLatitude" => (-30.0, 30.0))
  println("$(occ.scientific) -- latitude = $(occ.latitude)")
end
```

### Batch-download of occurrences

When calling `occurrences`, the list of possible `GBIFRecord` will be
pre-allocated. Any subsequent call to `occurrences!` (on the `GBIFRecords`
variable) will retrieve the next "page" of results, and add them to the
collection:

```@docs
occurrences!
```

```@example
using GBIF
can_most_recent = occurrences("hasCoordinate" => true, "country" => "CA")
occurrences!(can_most_recent)
```


## Tables.jl interface

GBIF.jl defines a [Tables.jl](https://github.com/JuliaData/Tables.jl) interface.

This means [`GBIFRecords`](@ref) objects can be treated as a table, 
and e.g. saved to CSV without using an intermediate dataframe.

```@example tables
using GBIF, CSV
oc = occurrences()
CSV.write("test.csv", oc)
```

`GBIFRecords` can also be converted to a `DataFrame` or other Tables.jl compatable object:

```@example tables
using DataFrames
df = DataFrame(oc)
```

The available columns are:

| Column Name         | Type                             |
| :------------------ | :------------------------------- |
| `key`               | `Int64`                          |
| `datasetKey`        | `AbstractString`                 |
| `dataset`           | `Union{Missing, AbstractString}` |
| `publishingOrgKey`  | `Union{Missing, AbstractString}` |
| `publishingCountry` | `Union{Missing, AbstractString}` |
| `institutionCode`   | `Union{Missing, AbstractString}` |
| `protocol`          | `Union{Missing, AbstractString}` |
| `countryCode`       | `Union{Missing, AbstractString}` |
| `country`           | `Union{Missing, AbstractString}` |
| `basisOfRecord`     | `Symbol`                         |
| `individualCount`   | `Union{Missing, Integer}`        |
| `latitude`          | `Union{Missing, AbstractFloat}`  |
| `longitude`         | `Union{Missing, AbstractFloat}`  |
| `precision`         | `Union{Missing, AbstractFloat}`  |
| `uncertainty`       | `Union{Missing, AbstractFloat}`  |
| `geodetic`          | `Union{Missing, AbstractString}` |
| `date`              | `Union{Missing, DateTime}`       |
| `identified`        | `Union{Missing, DateTime}`       |
| `issues`            | `Vector{Symbol}`                 |
| `taxonKey`          | `Union{Missing, Integer}`        |
| `rank`              | `Union{Missing, AbstractString}` |
| `generic`           | `Union{Missing, AbstractString}  |
| `epithet`           | `Union{Missing, AbstractString}` |
| `vernacular`        | `Union{Missing, AbstractString}` |
| `scientific`        | `Union{Missing, AbstractString}` |
| `observer`          | `Union{Missing, AbstractString}` |
| `license`           | `Union{Missing, AbstractString}` |
| `kingdom`           | `String`                         |
| `phylum`            | `String`                         |
| `class`             | `String`                         |
| `order`             | `String`                         |
| `family`            | `String`                         |
| `genus`             | `Union{Missing, String}`         | 
| `species`           | `Union{Missing, String}`         |

