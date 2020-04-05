var documenterSearchIndex = {"docs":
[{"location":"filter/#Filtering-observations-1","page":"Filtering records","title":"Filtering observations","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"Within a GBIFRecord object, the occurrences themselves are stored in a view. A view is basically an array that can be masked, so it is possible to retain all of the raw data, while only presenting the data that pass filtering.","category":"page"},{"location":"filter/#Apply-filters-to-the-data-1","page":"Filtering records","title":"Apply filters to the data","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"filter!","category":"page"},{"location":"filter/#Base.filter!","page":"Filtering records","title":"Base.filter!","text":"Filters a series of records\n\nThis function will take the filter function f and use it to mask the records that do not satisfy it. Note that if a record is already masked due to the application of a previous filter, its status will not be modified. The application of filters is therefore cumulative.\n\nNote that while the usual filter! function removes objects, this one will only mask them. The objects can be unmasked with allrecords!. This design choice was made because GBIFRecords track the position in the API pages, and it seemed safer to keep all information. Note that when calling length or iterating over a GBIFRecords object, only the unmasked records will be shown.\n\nIt is possible to apply multiple filters at once, using the following syntax:\n\nfilter!.([f1, f2, f3], records)\n\n\n\n\n\n","category":"function"},{"location":"filter/#Removing-filters-1","page":"Filtering records","title":"Removing filters","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"allrecords!","category":"page"},{"location":"filter/#GBIF.allrecords!","page":"Filtering records","title":"GBIF.allrecords!","text":"Show all occurrences\n\nThis function reverses the action of filter!. It will unmask all records that have been removed under the current filters.\n\n\n\n\n\n","category":"function"},{"location":"filter/#List-of-built-in-filters-1","page":"Filtering records","title":"List of built-in filters","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"have_both_coordinates\nhave_neither_zero_coordinates\nhave_no_zero_coordinates\nhave_no_issues\nhave_ok_coordinates\nhave_a_date","category":"page"},{"location":"filter/#GBIF.have_both_coordinates","page":"Filtering records","title":"GBIF.have_both_coordinates","text":"Both latitude and longitude are present\n\nThis filter will only retain occurrences that have both a latitude and a longitude field.\n\n\n\n\n\n","category":"function"},{"location":"filter/#GBIF.have_neither_zero_coordinates","page":"Filtering records","title":"GBIF.have_neither_zero_coordinates","text":"Neither latitude nor longitude are 0.0\n\nThis filter will only retain occurrences that are not at the (0,0) coordinate.\n\n\n\n\n\n","category":"function"},{"location":"filter/#GBIF.have_no_zero_coordinates","page":"Filtering records","title":"GBIF.have_no_zero_coordinates","text":"At most one of latitude and longitude is 0.0\n\nThis filter will only retain occurrences that have at most one coordinate being exactly 0.0.\n\n\n\n\n\n","category":"function"},{"location":"filter/#GBIF.have_no_issues","page":"Filtering records","title":"GBIF.have_no_issues","text":"No known issues at all\n\nThis filter will retain no observation. At least not in theory, but it is very rare to have GBIF records with absolutely no issues. Its use is discouraged.\n\n\n\n\n\n","category":"function"},{"location":"filter/#GBIF.have_ok_coordinates","page":"Filtering records","title":"GBIF.have_ok_coordinates","text":"No coordinates issues except rounding and WGS84 assumption\n\nThis filter will retain observations that have no issues, with the exception of assuming WGS84 projection (which a large number of GBIF records do), and rounded coordinates (same thing). It is a reasonable filter for most use cases.\n\n\n\n\n\n","category":"function"},{"location":"filter/#GBIF.have_a_date","page":"Filtering records","title":"GBIF.have_a_date","text":"The date is not missing\n\nThis filter will remove observations with a missing date.\n\n\n\n\n\n","category":"function"},{"location":"filter/#Making-your-own-filters-1","page":"Filtering records","title":"Making your own filters","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"Filter functions are all sharing the same declaration: they accept a single GBIFRecord object as input, and return a boolean as output. Think of the filter as a question you ask about the occurrence object. Does it have no know issues? If this is true, then we keep this record. If not, we reject it.","category":"page"},{"location":"filter/#Filtering-occurrences-after-download-1","page":"Filtering records","title":"Filtering occurrences after download","text":"","category":"section"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"The GBIFRecords objects can be used with the Query.jl package. For example, to get the observations from France in the most recent 20 observations, we can use:","category":"page"},{"location":"filter/#","page":"Filtering records","title":"Filtering records","text":"using Query\no = occurrences()\n@from i in o begin\n    @where i.country == \"France\"\n    @select {i.key, i.species}\n    @collect\nend","category":"page"},{"location":"data/#Retrieving-data-1","page":"Getting data","title":"Retrieving data","text":"","category":"section"},{"location":"data/#Getting-taxonomic-information-1","page":"Getting data","title":"Getting taxonomic information","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"taxon","category":"page"},{"location":"data/#GBIF.taxon","page":"Getting data","title":"GBIF.taxon","text":"Get information about a taxon at any level\n\ntaxon(name::String)\n\nThis function will look for a taxon by its (scientific) name in the GBIF reference taxonomy.\n\nOptional arguments are\n\nrank::Union{Symbol,Nothing}=:SPECIES – the rank of the taxon you want. This is part of a controlled vocabulary, and can only be one of :DOMAIN, :CLASS, :CULTIVAR, :FAMILY, :FORM, :GENUS, :INFORMAL, :ORDER, :PHYLUM,, :SECTION, :SUBCLASS, :VARIETY, :TRIBE, :KINGDOM, :SUBFAMILY, :SUBFORM, :SUBGENUS, :SUBKINGDOM, :SUBORDER, :SUBPHYLUM, :SUBSECTION, :SUBSPECIES, :SUBTRIBE, :SUBVARIETY, :SUPERCLASS, :SUPERFAMILY, :SUPERORDER, and :SPECIES\nstrict::Bool=true – whether the match should be strict, or fuzzy\nverbose::Bool=false – whether the query should print out information about the reply (not usually useful)\n\nFinally, one can also specify other levels of the taxonomy, using  kingdom, phylum, class, order, family, and genus, all of which can either be String or Nothing.\n\n\n\n\n\nGet information about a taxon at any level using taxonID\n\ntaxon(id::Int)\n\nThis function will look for a taxon by its taxonID in the GBIF reference taxonomy.\n\n\n\n\n\n","category":"function"},{"location":"data/#Getting-occurrence-data-1","page":"Getting data","title":"Getting occurrence data","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"The most common task is to retrieve a number of occurrences. The core type of this package is GBIFRecord, which stores a number of data and metadata associated with observations of occurrences.","category":"page"},{"location":"data/#Single-occurrence-1","page":"Getting data","title":"Single occurrence","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"occurrence","category":"page"},{"location":"data/#GBIF.occurrence","page":"Getting data","title":"GBIF.occurrence","text":"Return an interpreted occurrence given its key\n\noccurrence(key::Union{String, Integer})\n\nThe key can be given as a string or as an integer.\n\n\n\n\n\n","category":"function"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"This can be used to retrieve occurrence 1425976049, with","category":"page"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"using GBIF\noccurrence(1425976049)","category":"page"},{"location":"data/#Multiple-occurrences-1","page":"Getting data","title":"Multiple occurrences","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"occurrences()\noccurrences(t::GBIFTaxon)","category":"page"},{"location":"data/#GBIF.occurrences-Tuple{}","page":"Getting data","title":"GBIF.occurrences","text":"Retrieve latest occurrences based on a query\n\noccurrences(query::Pair...)\n\nThis function will return the latest occurrences matching the queries – usually 20, but this is entirely determined by the server default page size. The query parametes must be given as pairs, and are optional. Omitting the query will return the latest recorded occurrences.\n\n\n\n\n\n","category":"method"},{"location":"data/#GBIF.occurrences-Tuple{GBIFTaxon}","page":"Getting data","title":"GBIF.occurrences","text":"Retrieve latest occurrences for a taxon based on a query\n\noccurrences(t::GBIFTaxon, query::Pair...)\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n","category":"method"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"When called with no arguments, this function will return a list of the latest 20 occurrences recorded in GBIF. Note that the GBIFRecords type, returned by occurrences, implements all the necessary methods to iterate over collections. For example, this allows writing the following:","category":"page"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"o = occurrences()\nfor single_occ in o\n  println(o.taxonKey)\nend","category":"page"},{"location":"data/#Query-parameters-1","page":"Getting data","title":"Query parameters","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"occurrences(query::Pair...)\noccurrences(t::GBIFTaxon, query::Pair...)","category":"page"},{"location":"data/#GBIF.occurrences-Tuple{Vararg{Pair,N} where N}","page":"Getting data","title":"GBIF.occurrences","text":"Retrieve latest occurrences based on a query\n\noccurrences(query::Pair...)\n\nThis function will return the latest occurrences matching the queries – usually 20, but this is entirely determined by the server default page size. The query parametes must be given as pairs, and are optional. Omitting the query will return the latest recorded occurrences.\n\n\n\n\n\n","category":"method"},{"location":"data/#GBIF.occurrences-Tuple{GBIFTaxon,Vararg{Pair,N} where N}","page":"Getting data","title":"GBIF.occurrences","text":"Retrieve latest occurrences for a taxon based on a query\n\noccurrences(t::GBIFTaxon, query::Pair...)\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n","category":"method"},{"location":"data/#Batch-download-of-occurrences-1","page":"Getting data","title":"Batch-download of occurrences","text":"","category":"section"},{"location":"data/#","page":"Getting data","title":"Getting data","text":"occurrences!","category":"page"},{"location":"data/#GBIF.occurrences!","page":"Getting data","title":"GBIF.occurrences!","text":"Get the next page of results\n\nThis function will retrieve the next page of results. By default, it will walk through queries 20 at a time. This can be modified by changing the .query[\"limit\"] value, to any value below 200.\n\nIf filters have been applied to this query before, they will be removed to ensure that the previous and the new occurrences have the same status.\n\n\n\n\n\n","category":"function"},{"location":"#Access-GBIF-data-with-Julia-1","page":"Home","title":"Access GBIF data with Julia","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package offers access to biodiversity data through the Global Biodiversity Information Facility (GBIF) API. The package currently supports access to occurrence information, and limited support for taxonomic information. There are a limited number of cleaning routines built-in, but more can easily be added.","category":"page"},{"location":"#How-to-install-1","page":"Home","title":"How to install","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The package can be installed from the Julia console:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Pkg.add(\"GBIF\")","category":"page"},{"location":"#How-to-use-1","page":"Home","title":"How to use","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"After installing it, load the package as usual:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using GBIF","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This documentation will walk you through the various features.","category":"page"},{"location":"types/#Data-representation-1","page":"Types","title":"Data representation","text":"","category":"section"},{"location":"types/#","page":"Types","title":"Types","text":"GBIFTaxon\nGBIFRecord\nGBIFRecords","category":"page"},{"location":"types/#GBIF.GBIFTaxon","page":"Types","title":"GBIF.GBIFTaxon","text":"Representation of a GBIF taxon\n\nAll taxonomic level fields can either be missing, or a pair linking the name of the taxon/level to its unique key in the GBIF database.\n\nname - the vernacular name of the taxon\n\nscientific - the accepted scientific name of the species\n\nstatus - the status of the taxon\n\nmatch - the type of match\n\nkingdom - a Pair linking the name of the kingdom to its unique ID\n\nphylum - a Pair linking the name of the phylum to its unique ID\n\nclass - a Pair linking the name of the class to its unique ID\n\norder - a Pair linking the name of the order to its unique ID\n\nfamily - a Pair linking the name of the family to its unique ID\n\ngenus - a Pair linking the name of the genus to its unique ID\n\nspecies - a Pair linking the name of the species to its unique ID\n\nconfidence - an Int64 to note the confidence in the match\n\nsynonym - a Boolean indicating whether the taxon is a synonym\n\n\n\n\n\n","category":"type"},{"location":"types/#GBIF.GBIFRecord","page":"Types","title":"GBIF.GBIFRecord","text":"Represents an occurrence in the GBIF format\n\nThis is currently a subset of all the fields. This struct is not mutable – this ensures that the objects returned from the GBIF database are never modified by the user.\n\nThe taxon field is a GBIFTaxon object, and can therefore be manipulated as any other GBIFTaxon.\n\n\n\n\n\n","category":"type"},{"location":"types/#GBIF.GBIFRecords","page":"Types","title":"GBIF.GBIFRecords","text":"List of occurrences and metadata\n\nThis type has actually very few information, besides offset (the number of records already retrieved) and count (the total number of records). The query field stores the query parameters, and show is a vector of boolean values to decide which of the GBIFRecord (stored in occurrences) will be displayed.\n\nThis type is mutable and fully iterable.\n\n\n\n\n\n","category":"type"}]
}
