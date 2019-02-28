"""
**Both latitude and longitude are present**

This filter will only retain occurrences that have *both* a latitude and a
longitude field.
"""
function have_both_coordinates(o::GBIFRecord)
  !(ismissing(o.latitude)&ismissing(o.latitude))
end

"""
**Neither latitude nor longitude are 0.0**

This filter will only retain occurrences that are *not* at the (0,0) coordinate.
"""
function have_neither_zero_coordinates(o::GBIFRecord)
  !((o.latitude==0.0)&(o.longitude==0.0))
end

"""
**At most one of latitude and longitude is 0.0**

This filter will only retain occurrences that have *at most* one coordinate
being exactly 0.0.
"""
function have_no_zero_coordinates(o::GBIFRecord)
  !((o.latitude==0.0)|(o.longitude==0.0))
end

"""
**The date is not missing**

This filter will remove observations with a missing date.
"""
function have_a_date(o::GBIFRecord)
  !ismissing(o.date)
end

"""
**No known issues at all**

This filter will retain no observation. At least not in theory, but it is very
rare to have GBIF records with absolutely no issues. Its use is discouraged.
"""
function have_no_issues(o::GBIFRecord)
  length(o.issues) == 0
end

"""
**No coordinates issues except rounding and WGS84 assumption**

This filter will retain observations that have no issues, with the exception of
assuming WGS84 projection (which a large number of GBIF records do), and rounded
coordinates (same thing). It is a reasonable filter for most use cases.
"""
function have_ok_coordinates(o::GBIFRecord)
  ok = true
  for i in o.issues
    if !(i in [:COORDINATE_ROUNDED, :GEODETIC_DATUM_ASSUMED_WGS84])
      ok = false
    end
  end
  return ok
end

"""
**Filters a series of records on a single criteria**

This function will take the filter function `f` and use it to *mask* the records
that do not satisfy it. Note that if a record is *already* masked due to the
application of a previous filter, its status will *not* be modified. The
application of filters is therefore cumulative.

To ensure consistency with the `filter!` function from Base, this function only
accepts a *single* filter `f` at a time. To apply multiple filters, it is
necessary to call the function several times.
"""
function Base.filter!(f, o::GBIFRecords)
  keep = map(f, o.occurrences)
  o.show = o.show .& keep
end

"""
**Cleans a search output**

This function is deprecated and will be removed in a later release, use
`filter!` instead.
"""
function qualitycontrol!(o::GBIFRecords; filters::Array{T,1}=[have_no_issues], verbose::Bool=true) where {T<:Function}
  @warn "The qualitycontrol! function is deprecated and will be removed in a future release -- use filter! instead."
  keep = ones(Bool, length(o.occurrences))
  if verbose
    @info "Starting quality control with $(length(o.occurrences)) records"
  end
  for f in filters
    keep_f = map(f, o.occurrences)
    keep = keep .* keep_f
    if verbose
      @info "$(count(keep)) records left after $(f)"
    end
  end
  o.show = keep
end

"""
**Show all occurrences**

This function reverses the action of `filter!`. It will unmask all
records that have been removed under the current filters.
"""
function showall!(o::GBIFRecords)
  o.show = ones(Bool, length(o.occurrences))
end
