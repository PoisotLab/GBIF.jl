import Base.length, Base.getindex, Base.iterate, Base.view, Base.size

function view(o::GBIFRecords)
    defined = filter(i -> isassigned(o.occurrences, i), eachindex(o.occurrences))
    return view(o.occurrences, defined)
end

function size(o::GBIFRecords)
    return length(o.occurrences)
end

function length(o::GBIFRecords)
    return length(view(o))
end

function getindex(o::GBIFRecords, i::Int64)
    return view(o)[i]
end

function getindex(o::GBIFRecords, r::UnitRange{Int64})
    return view(o)[r]
end

function iterate(o::GBIFRecords)
    return iterate(collect(view(o)))
end

function iterate(o::GBIFRecords, t::Union{Int64, Nothing})
    return iterate(collect(view(o)), t)
end
