
Tables.istable(::GBIFRecords) = true
Tables.rowaccess(table::GBIFRecords) = true
Tables.rows(table::GBIFRecords) = collect(view(table))
