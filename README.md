# scrollable-table.js

example of use - index.html

<pre>
let scrollableTableId = "table";
let scrollableTable = new ScrollableTable(scrollableTableId);
</pre>
scrollableTableId - Id of table;</br>
js will use set data-scrollable-table attributes with id value to wrappers and table parts so it can be easy selected and customized;</br>
new ScrollableTable(scrollableTableId) - creates scrollable table</br>
ScrollableTable has 3 methods you can call - 
</br>
reset all attributes and delete all wrappers that was added/created -
<pre>
scrollableTable.reset();
</pre>
</br>
create table again -
<pre>
scrollableTable.init();
</pre>
</br>
call reset method then init, can be used for table with dynamic data
<pre>
scrollableTable.reinit();
</pre>
