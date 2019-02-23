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
    "text": "This package offers access to biodiversity data through the Global Biodiversity Information Facility ([GBIF]) API. The package currently supports access to occurrence information, and limited support for taxonomic information. There are a limited number of cleaning routines built-in, but more can easily be added."
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
    "text": "After installing it, load the package as usual:using GBIFThis documentation will walk you through the various features.[GBIF]: https://www.gbif.org/"
},

{
    "location": "occurrences/#",
    "page": "Occurrences",
    "title": "Occurrences",
    "category": "page",
    "text": ""
},

{
    "location": "occurrences/#Retrieving-occurrences-1",
    "page": "Occurrences",
    "title": "Retrieving occurrences",
    "category": "section",
    "text": "The most common task is to retrieve a number of occurrences. The core type of this package is GBIFRecord, which stores a number of data and metadata associated with observations of occurrences."
},

{
    "location": "occurrences/#GBIF.occurrence",
    "page": "Occurrences",
    "title": "GBIF.occurrence",
    "category": "function",
    "text": "Return an interpreted occurrence given its key\n\nThe key can be given as a string or as an integer.\n\n\n\n\n\n"
},

{
    "location": "occurrences/#Getting-a-single-occurrence-1",
    "page": "Occurrences",
    "title": "Getting a single occurrence",
    "category": "section",
    "text": "occurrenceThis can be used to retrieve [occurrence 1425976049][exocc], withusing GBIF\noccurrence(1425976049)[exocc]: https://www.gbif.org/occurrence/1425976049"
},

{
    "location": "occurrences/#GBIF.occurrences-Tuple{}",
    "page": "Occurrences",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Search for occurrences\n\nThis function will return the latest occurrences – usually 20, but this is entirely determined by the server default page size. This is mostly useful to get a few results rapidly for illustration purposes.\n\n\n\n\n\n"
},

{
    "location": "occurrences/#Getting-multiple-occurrences-1",
    "page": "Occurrences",
    "title": "Getting multiple occurrences",
    "category": "section",
    "text": "occurrences()When called with no arguments, this function will return a list of the latest 20 occurrences recorded in GBIF. Additional arguments can be specified to filter some occurrences. They are detailed in the \"Using queries\" section of this manual.Note that the GBIFRecords type, returned by occurrences, implements all the necessary methods to iterate over collections. For example, this allows writing the following:o = occurrences()\nfor single_occ in o\n  println(o.taxonKey)\nend"
},

{
    "location": "occurrences/#GBIF.next!",
    "page": "Occurrences",
    "title": "GBIF.next!",
    "category": "function",
    "text": "Get the next page of results\n\nThis function will retrieve the next page of results. By default, it will walk through queries 20 at a time. This can be modified by changing the .query[\"limit\"] value, to any value below 200.\n\n\n\n\n\n"
},

{
    "location": "occurrences/#GBIF.complete!",
    "page": "Occurrences",
    "title": "GBIF.complete!",
    "category": "function",
    "text": "Get all pages of results\n\nThis function will retrieve all matches (up to the GBIF limit of 200000 records for a streaming query). It is recommended to set the limit to more than the default of 20 before calling this function. If not, this will trigger a lot of requests both from your end and on the GBIF infrastructure.\n\nInternally, this function is simply calling next! until all records are exhausted.\n\n\n\n\n\n"
},

{
    "location": "occurrences/#Batch-download-of-occurrences-1",
    "page": "Occurrences",
    "title": "Batch-download of occurrences",
    "category": "section",
    "text": "next!\ncomplete!"
},

{
    "location": "occurrences/#Filtering-occurrences-after-download-1",
    "page": "Occurrences",
    "title": "Filtering occurrences after download",
    "category": "section",
    "text": "The GBIFRecords objects can be used with the Query.jl package. For example, to get the observations from France in the most recent 20 observations, we can use:using Query\no = occurrences()\n@from i in o begin\n    @where i.country == \"France\"\n    @select {i.key, i.species}\n    @collect\nend"
},

{
    "location": "queries/#",
    "page": "Queries",
    "title": "Queries",
    "category": "page",
    "text": ""
},

{
    "location": "queries/#GBIF.occurrences-Tuple{Dict}",
    "page": "Queries",
    "title": "GBIF.occurrences",
    "category": "method",
    "text": "Search for occurrences\n\nReturns occurrences that correspond to a filter, given in q as a dictionary. When first called, this function will return the latest 20 hits (or whichever default page size GBIF uses). Future occurrences can be queried with next! or complete!.\n\n\n\n\n\n"
},

{
    "location": "queries/#Query-parameters-1",
    "page": "Queries",
    "title": "Query parameters",
    "category": "section",
    "text": "occurrences(q::Dict)"
},

{
    "location": "queries/#GBIF.check_records_parameters!-Tuple{Dict}",
    "page": "Queries",
    "title": "GBIF.check_records_parameters!",
    "category": "method",
    "text": "Checks that the queries for occurrences searches are well formatted\n\nThis is used internally.\n\nEverything this function does is derived from the GBIF API documentation, including (and especially) the values for enum types. This modifies the queryset. Filters that are not allowed are removed, and filters that have incorrect values are dropped too.\n\nThis feels like the most conservative option – the user can always filter the results when they are returned.\n\n\n\n\n\n"
},

{
    "location": "queries/#Internal-checks-for-query-parameters-1",
    "page": "Queries",
    "title": "Internal checks for query parameters",
    "category": "section",
    "text": "GBIF.check_records_parameters!(q::Dict)"
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
    "text": "Cleans a search output\n\nThis function loops through all records, and applies the filters to it. Filters are built-in or user-defined functions that return true when the record needs to be kept, and false when it needs to be discarded.\n\nIt is important to note that the records are not actually removed: they are masked from user view. This means that you can try different filtering strategies without having to re-query GBIF.\n\n\n\n\n\n"
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

]}
