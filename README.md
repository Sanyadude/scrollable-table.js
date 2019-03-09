# scrollable-table.js

example of use - index.html

let scrollableTableId = "table"; - Id of table;</br>
let scrollableTableName = "myTable"; - js will use this name to create data-scrollable-table attributes to wrappers and table parts so it can be easy selected and customized;</br>
let scrollWidth = 17px; - for setting table header wrapper padding-right;</br></br>
let scrollableTable = new ScrollableTable(scrollableTableId, scrollableTableName, scrollWidth); - create scrollable table from your table;</br>
also you can use it just with id: </br></br>
let scrollableTable2 = new ScrollableTable(scrollableTableId);
