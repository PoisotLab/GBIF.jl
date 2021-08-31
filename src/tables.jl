
Tables.istable(::GBIFRecords) = true
Tables.rowaccess(table::GBIFRecords) = true
Tables.rows(table::GBIFRecords) = collect(view(table))

const SCHEMA = (
    key = Int64,
    datasetKey = String,
    dataset = Union{Missing, String},
    publishingOrgKey = Union{Missing, String},
    publishingCountry = Union{Missing, String},
    institutionCode = Union{Missing, String},
    protocol = Union{Missing, String},
    countryCode = Union{Missing, String},
    country = Union{Missing, String},
    basisOfRecord = Symbol,
    individualCount = Union{Missing, Int},
    latitude = Union{Missing, Float64},
    longitude = Union{Missing, Float64},
    precision = Union{Missing, Float64},
    uncertainty = Union{Missing, Float64},
    geodetic = Union{Missing, String},
    date = Union{Missing, DateTime},
    identified = Union{Missing, DateTime},
    issues = Vector{Symbol},
    taxonKey = Union{Missing, Int},
    rank = Union{Missing, String},
    generic = Union{Missing, String},
    epithet = Union{Missing, String},
    vernacular = Union{Missing, String},
    scientific = Union{Missing, String},
    observer = Union{Missing, String},
    license = Union{Missing, String},
    kingdom = Union{Missing, String},
    phylum = Union{Missing, String},
    class = Union{Missing, String},
    order = Union{Missing, String},
    family = Union{Missing, String},
    genus = Union{Missing, String},
    species = Union{Missing, String},
)

Tables.schema(s::GBIFRecords) = Tables.Schema(keys(SCHEMA), values(SCHEMA))
