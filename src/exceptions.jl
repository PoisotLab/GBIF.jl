import Base: showerror

abstract type GBIFException <: Exception end

struct NoTaxonMatchedAtRank <: GBIFException
    taxon::String
    rank::String
end

struct OtherTaxonMatchingException <: GBIFException
    taxon::String
    rank::String
end

struct BadHTMLResponseCode <: GBIFException
    taxon::String
    rank::String
    errorcode::Integer
end

function Base.showerror(io::IO, err::NoTaxonMatchedAtRank)
    msg = "No match in the GBIF taxonomy for $(err.tax) at rank $(err.rank)\n"
    msg *= "→ you can append `strict=false` to your query to have non-strict matching"
    return print(io, msg)
end