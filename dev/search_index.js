var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#Access-GBIF-data-with-Julia-1",
    "page": "Home",
    "title": "Access GBIF data with Julia",
    "category": "section",
    "text": "This package offers access to biodiversity data through the Global Biodiversity Information Facility (GBIF) API. The package currently supports access to occurrence information, and limited support for taxonomic information. There are a limited number of cleaning routines built-in, but more can easily be added."
},

{
    "location": "#How-to-install-1",
    "page": "Home",
    "title": "How to install",
    "category": "section",
    "text": "The package can be installed from the Julia console:Pkg.add(\"GBIF\")"
},

{
    "location": "#How-to-use-1",
    "page": "Home",
    "title": "How to use",
    "category": "section",
    "text": "After installing it, load the package as usual:using GBIFThis documentation will walk you through the various features."
},

{
    "location": "data/#",
    "page": "Getting data",
    "title": "Getting data",
    "category": "page",
    "text": ""
},

{
    "location": "data/#Retrieving-data-1",
    "page": "Getting data",
    "title": "Retrieving data",
    "category": "section",
    "text": ""
},

{
    "location": "data/#GBIF.taxon",
    "page": "Getting data",
    "title": "GBIF.taxon",
    "category": "function",
    "text": "Get information about a taxon at any level\n\ntaxon(name::String)\n\nThis function will look for a taxon by its (scientific) name in the GBIF reference taxonomy.\n\nOptional arguments are\n\nrank::Union{Symbol,Nothing}=:SPECIES – the rank of the taxon you want. This is part of a controlled vocabulary, and can only be one of :DOMAIN, :CLASS, :CULTIVAR, :FAMILY, :FORM, :GENUS, :INFORMAL, :ORDER, :PHYLUM,, :SECTION, :SUBCLASS, :VARIETY, :TRIBE, :KINGDOM, :SUBFAMILY, :SUBFORM, :SUBGENUS, :SUBKINGDOM, :SUBORDER, :SUBPHYLUM, :SUBSECTION, :SUBSPECIES, :SUBTRIBE, :SUBVARIETY, :SUPERCLASS, :SUPERFAMILY, :SUPERORDER, and :SPECIES\nstrict::Bool=true – whether the match should be strict, or fuzzy\nverbose::Bool=false – whether the query should print out information about the reply (not usually useful)\n\nFinally, one can also specify other levels of the taxonomy, using  kingdom, phylum, class, order, family, and genus, all of which can either be String or Nothing.\n\n\n\n\n\n"
},

{
    "location": "data/#Getting-taxonomic-information-1",
    "page": "Getting data",
    "title": "Getting taxonomic information",
    "category": "section",
    "text": "taxon"
},

{
    "location": "data/#Getting-occurrence-data-1",
    "page": "Getting data",
    "title": "Getting occurrence data",
    "category": "section",
    "text": "The most common task is to retrieve a number of occurrences. The core type of this package is GBIFRecord, which stores a number of data and metadata associated with observations of occurrences."
},

{
    "location": "data/#GBIF.occurrence",
    "page": "Getting data",
    "title": "GBIF.occurrence",
    "category": "function",
    "text": "Return an interpreted occurrence given its key\n\noccurrence(key::Union{String, Integer})\n\nThe key can be given as a string or as an integer.\n\n\n\n\n\n"
},

{
    "location": "data/#Single-occurrence-1",
    "page": "Getting data",
    "title": "Single occurrence",
    "category": "section",
    "text": "occurrenceThis can be used to retrieve occurrence 1425976049, withusing GBIF\noccurrence(1425976049)"
},

{
    "location": "data/#GBIF.occurrences-Tuple{}",
    "page": "Getting data",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Retrieve latest occurrences\n\noccurrences()\n\nThis function will return the latest occurrences – usually 20, but this is entirely determined by the server default page size. This is mostly useful to get a few results rapidly for illustration purposes.\n\n\n\n\n\n"
},

{
    "location": "data/#GBIF.occurrences-Tuple{GBIFTaxon}",
    "page": "Getting data",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Retrieve latest occurrences for a taxon\n\noccurrences(t::GBIFTaxon)\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n"
},

{
    "location": "data/#Multiple-occurrences-1",
    "page": "Getting data",
    "title": "Multiple occurrences",
    "category": "section",
    "text": "occurrences()\noccurrences(t::GBIFTaxon)When called with no arguments, this function will return a list of the latest 20 occurrences recorded in GBIF. Note that the GBIFRecords type, returned by occurrences, implements all the necessary methods to iterate over collections. For example, this allows writing the following:o = occurrences()\nfor single_occ in o\n  println(o.taxonKey)\nend"
},

{
    "location": "data/#GBIF.occurrences-Tuple{Dict}",
    "page": "Getting data",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Retrieve latest occurrences based on a query\n\noccurrences(q::Dict)\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n"
},

{
    "location": "data/#GBIF.occurrences-Tuple{GBIFTaxon,Dict}",
    "page": "Getting data",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Retrieve latest occurrences for a taxon based on a query\n\noccurrences(t::GBIFTaxon, q::Dict)\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n"
},

{
    "location": "data/#Query-parameters-1",
    "page": "Getting data",
    "title": "Query parameters",
    "category": "section",
    "text": "occurrences(q::Dict)\noccurrences(t::GBIFTaxon, q::Dict)"
},

{
    "location": "data/#GBIF.next!",
    "page": "Getting data",
    "title": "GBIF.next!",
    "category": "function",
    "text": "Get the next page of results\n\nThis function will retrieve the next page of results. By default, it will walk through queries 20 at a time. This can be modified by changing the .query[\"limit\"] value, to any value below 200.\n\n\n\n\n\n"
},

{
    "location": "data/#GBIF.complete!",
    "page": "Getting data",
    "title": "GBIF.complete!",
    "category": "function",
    "text": "Get all pages of results\n\nThis function will retrieve all matches (up to the GBIF limit of 200000 records for a streaming query). It is recommended to set the limit to more than the default of 20 before calling this function. If not, this will trigger a lot of requests both from your end and on the GBIF infrastructure.\n\nInternally, this function is simply calling next! until all records are exhausted.\n\n\n\n\n\n"
},

{
    "location": "data/#Batch-download-of-occurrences-1",
    "page": "Getting data",
    "title": "Batch-download of occurrences",
    "category": "section",
    "text": "next!\ncomplete!"
},

{
    "location": "qaqc/#",
    "page": "Filtering records",
    "title": "Filtering records",
    "category": "page",
    "text": ""
},

{
    "location": "qaqc/#Filtering-observations-1",
    "page": "Filtering records",
    "title": "Filtering observations",
    "category": "section",
    "text": "Within a GBIFRecord object, the occurrences themselves are stored in a view. A view is basically an array that can be masked, so it is possible to retain all of the raw data, while only presenting the data that pass filtering."
},

{
    "location": "qaqc/#GBIF.qualitycontrol!",
    "page": "Filtering records",
    "title": "GBIF.qualitycontrol!",
    "category": "function",
    "text": "Cleans a search output\n\nThis function loops through all records, and applies the filters to it. Filters are built-in or user-defined functions that return true when the record needs to be kept, and false when it needs to be discarded.\n\nIt is important to note that the records are not actually removed: they are masked from user view. This means that you can try different filtering strategies without having to re-query GBIF.\n\nThe optional filters argument is an array of functions, each of the functions must take a single GBIFRecord as an input, and return true or false.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#Apply-filtering-to-the-data-1",
    "page": "Filtering records",
    "title": "Apply filtering to the data",
    "category": "section",
    "text": "qualitycontrol!"
},

{
    "location": "qaqc/#GBIF.have_both_coordinates",
    "page": "Filtering records",
    "title": "GBIF.have_both_coordinates",
    "category": "function",
    "text": "Both latitude and longitude are present\n\nThis filter will only retain occurrences that have both a latitude and a longitude field.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#GBIF.have_neither_zero_coordinates",
    "page": "Filtering records",
    "title": "GBIF.have_neither_zero_coordinates",
    "category": "function",
    "text": "Neither latitude nor longitude are 0.0\n\nThis filter will only retain occurrences that are not at the (0,0) coordinate.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#GBIF.have_no_zero_coordinates",
    "page": "Filtering records",
    "title": "GBIF.have_no_zero_coordinates",
    "category": "function",
    "text": "At most one of latitude and longitude is 0.0\n\nThis filter will only retain occurrences that have at most one coordinate being exactly 0.0.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#GBIF.have_no_issues",
    "page": "Filtering records",
    "title": "GBIF.have_no_issues",
    "category": "function",
    "text": "No known issues at all\n\nThis filter will retain no observation. At least not in theory, but it is very rare to have GBIF records with absolutely no issues. Its use is discouraged.\n\nBy design, it is the default argument for qualitycontrol! – it\'s your job to decide precisely which filters you need to use.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#GBIF.have_ok_coordinates",
    "page": "Filtering records",
    "title": "GBIF.have_ok_coordinates",
    "category": "function",
    "text": "No coordinates issues except rounding and WGS84 assumption\n\nThis filter will retain observations that have no issues, with the exception of assuming WGS84 projection (which a large number of GBIF records do), and rounded coordinates (same thing). It is a reasonable filter for most use cases.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#List-of-filters-1",
    "page": "Filtering records",
    "title": "List of filters",
    "category": "section",
    "text": "have_both_coordinates\nhave_neither_zero_coordinates\nhave_no_zero_coordinates\nhave_no_issues\nhave_ok_coordinates"
},

{
    "location": "qaqc/#Making-your-own-filters-1",
    "page": "Filtering records",
    "title": "Making your own filters",
    "category": "section",
    "text": "Filter functions are all sharing the same declaration: they accept a single GBIFRecord object as input, and return a boolean as output. Think of the filter as a question you ask about the occurrence object. Does it have no know issues? If this is true, then we keep this record. If not, we reject it."
},

{
    "location": "qaqc/#GBIF.showall!",
    "page": "Filtering records",
    "title": "GBIF.showall!",
    "category": "function",
    "text": "Show all occurrences\n\nThis function reverses the action of qualitycontrol!. It will unmask all records that have been removed under the current filters.\n\n\n\n\n\n"
},

{
    "location": "qaqc/#Removing-filters-1",
    "page": "Filtering records",
    "title": "Removing filters",
    "category": "section",
    "text": "showall!"
},

{
    "location": "qaqc/#Filtering-occurrences-after-download-1",
    "page": "Filtering records",
    "title": "Filtering occurrences after download",
    "category": "section",
    "text": "The GBIFRecords objects can be used with the Query.jl package. For example, to get the observations from France in the most recent 20 observations, we can use:using Query\no = occurrences()\n@from i in o begin\n    @where i.country == \"France\"\n    @select {i.key, i.species}\n    @collect\nend"
},

{
    "location": "types/#",
    "page": "Types",
    "title": "Types",
    "category": "page",
    "text": ""
},

{
    "location": "types/#GBIF.GBIFTaxon",
    "page": "Types",
    "title": "GBIF.GBIFTaxon",
    "category": "type",
    "text": "Representation of a GBIF taxon\n\nAll taxonomic level fields can either be missing, or a pair linking the name of the taxon/level to its unique key in the GBIF database.\n\nname - the vernacular name of the taxon\n\nscientific - the accepted scientific name of the species\n\nstatus - the status of the taxon\n\nmatch - the type of match\n\nkingdom - a Pair linking the name of the kingdom to its unique ID\n\nphylum - a Pair linking the name of the phylum to its unique ID\n\nclass - a Pair linking the name of the class to its unique ID\n\norder - a Pair linking the name of the order to its unique ID\n\nfamily - a Pair linking the name of the family to its unique ID\n\ngenus - a Pair linking the name of the genus to its unique ID\n\nspecies - a Pair linking the name of the species to its unique ID\n\nconfidence - an Int64 to note the confidence in the match\n\nsynonym - a Boolean indicating whether the taxon is a synonym\n\n\n\n\n\n"
},

{
    "location": "types/#GBIF.GBIFRecord",
    "page": "Types",
    "title": "GBIF.GBIFRecord",
    "category": "type",
    "text": "Represents an occurrence in the GBIF format\n\nThis is currently a subset of all the fields. This struct is not mutable – this ensures that the objects returned from the GBIF database are never modified by the user.\n\nThe taxon field is a GBIFTaxon object, and can therefore be manipulated as any other GBIFTaxon.\n\n\n\n\n\n"
},

{
    "location": "types/#GBIF.GBIFRecords",
    "page": "Types",
    "title": "GBIF.GBIFRecords",
    "category": "type",
    "text": "List of occurrences and metadata\n\nThis type has actually very few informations, besides offset (the number of records already retrieved) and count (the total number of records). The query field stores the query parameters, and show is a vector of boolean values to decide which of the GBIFRecord (stored in occurrences) will be displayed.\n\nThis type is mutable and fully iterable.\n\n\n\n\n\n"
},

{
    "location": "types/#Data-representation-1",
    "page": "Types",
    "title": "Data representation",
    "category": "section",
    "text": "GBIFTaxon\nGBIFRecord\nGBIFRecords"
},

]}
