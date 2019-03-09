# scrollable-table.js

example of use - index.html

<pre>
let scrollableTableId = "table";
let scrollableTableName = "myTable";
let scrollWidth = 17px;
let scrollableTable = new ScrollableTable(scrollableTableId, scrollableTableName, scrollWidth);
</pre></br>
scrollableTableId - Id of table;</br>
scrollableTableName - js will use this name to set data-scrollable-table attributes to wrappers and table parts so it can be easy selected and customized;</br>
scrollWidth - for setting table header wrapper padding-right;</br></br>
new ScrollableTable(scrollableTableId, scrollableTableName, scrollWidth) - creates scrollable table from your table;</br>
or you can use it just with id: </br>
<pre>
let scrollableTable2 = new ScrollableTable(scrollableTableId);
</pre></br></br>
ScrollableTable has 2 methods you can call - </br>
<pre>
scrollableTable.resetTableHead();
</pre></br>resets all attributes and delete all wrappers that was added/created;</br>
<pre>
scrollableTable.createScrollableTable();
</pre></br>
creates table again;
