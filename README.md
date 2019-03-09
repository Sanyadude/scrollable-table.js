# scrollable-table.js

example of use - index.html

<pre>let scrollableTableId = "table";</pre> - Id of table;</br>
<pre>let scrollableTableName = "myTable";</pre> - js will use this name to set data-scrollable-table attributes to wrappers and table parts so it can be easy selected and customized;</br>
<pre>let scrollWidth = 17px;</pre> - for setting table header wrapper padding-right;</br></br>
<pre>let scrollableTable = new ScrollableTable(scrollableTableId, scrollableTableName, scrollWidth);</pre> - create scrollable table from your table;</br>
or you can use it just with id: </br>
let scrollableTable2 = new ScrollableTable(scrollableTableId);</br></br>
ScrollableTable has 2 methods you can call - </br>
scrollableTable.resetTableHead(); - to reset all attributes and delete all wrappers that was added/created;</br>
scrollableTable.createScrollableTable(); - to create table again;
