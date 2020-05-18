module GBIF

using HTTP
using JSON
using Dates
using Requires

const gbifurl = "http://api.gbif.org/v1/"
const gbifenums = Dict(
  "basisOfRecord" => [
    "FOSSIL_SPECIMEN",
    "HUMAN_OBSERVATION",
    "LITERATURE",
    "LIVING_SPECIMEN",
    "MACHINE_OBSERVATION",
    "MATERIAL_SAMPLE",
    "OBSERVATION",
    "PRESERVED_SPECIMEN",
    "UNKNOWN"
  ],
  "continent" => [
    "AFRICA",
    "ANTARCTICA",
    "ASIA",
    "EUROPE",
    "NORTH_AMERICA",
    "OCEANIA",
    "SOUTH_AMERICA"
  ],
  "establishmentMeans" => [
    "INTRODUCED",
    "INVASIVE",
    "MANAGED",
    "NATIVE",
    "NATURALISED",
    "UNCERTAIN"
  ],
  "issue" => [
    "BASIS_OF_RECORD_INVALID",
    "CONTINENT_COUNTRY_MISMATCH",
    "CONTINENT_DERIVED_FROM_COORDINATES",
    "CONTINENT_INVALID",
    "COORDINATE_INVALID",
    "COORDINATE_OUT_OF_RANGE",
    "COORDINATE_PRECISION_INVALID",
    "COORDINATE_REPROJECTED",
    "COORDINATE_REPROJECTION_FAILED",
    "COORDINATE_REPROJECTION_SUSPICIOUS",
    "COORDINATE_ROUNDED",
    "COORDINATE_UNCERTAINTY_METERS_INVALID",
    "COUNTRY_COORDINATE_MISMATCH",
    "COUNTRY_DERIVED_FROM_COORDINATES",
    "COUNTRY_INVALID",
    "COUNTRY_MISMATCH",
    "DEPTH_MIN_MAX_SWAPPED",
    "DEPTH_NON_NUMERIC",
    "DEPTH_NOT_METRIC",
    "DEPTH_UNLIKELY",
    "ELEVATION_MIN_MAX_SWAPPED",
    "ELEVATION_NON_NUMERIC",
    "ELEVATION_NOT_METRIC",
    "ELEVATION_UNLIKELY",
    "GEODETIC_DATUM_ASSUMED_WGS84",
    "GEODETIC_DATUM_INVALID",
    "IDENTIFIED_DATE_INVALID",
    "IDENTIFIED_DATE_UNLIKELY",
    "INDIVIDUAL_COUNT_INVALID",
    "INTERPRETATION_ERROR",
    "MODIFIED_DATE_INVALID",
    "MODIFIED_DATE_UNLIKELY",
    "MULTIMEDIA_DATE_INVALID",
    "MULTIMEDIA_URI_INVALID",
    "PRESUMED_NEGATED_LATITUDE",
    "PRESUMED_NEGATED_LONGITUDE",
    "PRESUMED_SWAPPED_COORDINATE",
    "RECORDED_DATE_INVALID",
    "RECORDED_DATE_MISMATCH",
    "RECORDED_DATE_UNLIKELY",
    "REFERENCES_URI_INVALID",
    "TAXON_MATCH_FUZZY",
    "TAXON_MATCH_HIGHERRANK",
    "TAXON_MATCH_NONE",
    "TYPE_STATUS_INVALID",
    "ZERO_COORDINATE"
  ]
 )

#=
HACK this is required because some GBIF strings fail to parse, and I do not know
why.
=#
import Base: convert
function convert(::Type{AbstractString}, t::T) where {T <: Nothing}
  return "<nothing>"
end

# Load the main functions

include("query.jl")

include("types/GBIFTaxon.jl")
export GBIFTaxon

include("types/GBIFRecords.jl")
export GBIFRecord, GBIFRecords

include("types/iterators.jl")
include("types/show.jl")

include("taxon.jl")
export taxon

include("occurrence.jl")
include("paging.jl")
export occurrence, occurrences
export occurrences!

include("filter.jl")
export have_both_coordinates, have_neither_zero_coordinates,
  have_no_zero_coordinates, have_no_issues, have_ok_coordinates,
  have_a_date
export qualitycontrol!, showall!, filter!, allrecords!

# Extends with DataFrames functionalities
function __init__()
  @require DataFrames="a93c6f00-e57d-5684-b7b6-d8193f3e46c0" begin
  @info "Loading DataFrames support for GBIF.jl"
    format_gbif_entity(t::Missing) = missing
    format_gbif_entity(t::Pair{String,Int64}) = t.first
    function DataFrame(records::GBIFRecords)
      output = DataFrame(
        id = Int64[],
        name = Union{Missing,AbstractString}[],
        dataset = Union{Missing,AbstractString}[],
        publishing_country = Union{Missing, AbstractString}[],
        country = Union{Missing, AbstractString}[],
        latitude = Union{Missing, AbstractFloat}[],
        longitude = Union{Missing, AbstractFloat}[],
        date = Union{Missing, DateTime}[],
        rank = Union{Missing, AbstractString}[],
        observer = Union{Missing, AbstractString}[],
        license = Union{Missing, AbstractString}[],
        kingdom = Union{Missing,Symbol}[],
        phylum = Union{Missing,Symbol}[],
        class = Union{Missing,Symbol}[],
        order = Union{Missing,Symbol}[],
        family = Union{Missing,Symbol}[],
        genus = Union{Missing,Symbol}[],
        species = Union{Missing,Symbol}[]
      )
      for occ in records
        push!(
          output,
          (
            occ.id, occ.taxon.name, occ.dataset, occ.publishingCountry,
            occ.country, occ.latitude, occ.longitude,
            occ.date, occ.rank, occ.observer, occ.license,
            format_gbif_entity(occ.taxon.kingdom),
            format_gbif_entity(occ.taxon.phylum),
            format_gbif_entity(occ.taxon.class),
            format_gbif_entity(occ.taxon.order),
            format_gbif_entity(occ.taxon.family),
            format_gbif_entity(occ.taxon.genus),
            format_gbif_entity(occ.taxon.species)
          )
        )
      end
      return output
    end
  end
end

end # module
