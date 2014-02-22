cat 8rw6-mmz7.json | jq -c '.[]' | sed 's/^/{"index":{}}\n/g' | curl -s -XPOST localhost:9200/seabike/dsg/_bulk --data-binary @-; echo
