module TestDataFrames

using GBIF
using DataFrames
using Test
using CSV

oc = occurrences()

# This is very slow to compile, we should fix type stability somewhat
df = DataFrame(oc)
@test typeof(df) <: DataFrame

CSV.write("test.csv", oc)
@test isfile("test.csv")
CSV.read("test.csv", DataFrame)
rm("test.csv")


end
