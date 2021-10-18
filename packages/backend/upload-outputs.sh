#!/bin/bash

die () {
  echo $1
  exit 1
}

bucket=$(cat outputs.json | jq -r '.[keys[0]] | with_entries(if (.key|test("^.*frontendBucketName$")) then ( {key: "frontendBucketName", value: .value } ) else empty end ) | .frontendBucketName')

[ -n "$bucket" ] || die "could not determine bucket name"

aws s3 cp outputs.json s3://${bucket}/