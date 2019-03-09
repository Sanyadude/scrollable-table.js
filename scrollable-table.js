'use strict';

function ScrollableTable(tableId, tableName, scrollWidth) {
    tableName = tableName ? tableName : 'table';
    scrollWidth = scrollWidth ? scrollWidth : 17;
    let tableDataAttrName = 'table';
    let tableContainerDataAttrName = 'table-container';
    let tableHeadContainerDataAttrName = 'table-head-container';
    let tableBodyContainerDataAttrName = 'table-body-container';
    let tableTemporaryHeadDataAttrName = 'table-temporary-head';
    let tableHeadDataAttrName = 'table-head';
    let tableBodyDataAttrName = 'table-body';
    let tr = 'tr';
    let th = 'th';
    let td = 'td';
    let div = 'div';
    let theadTag = 'thead';
    let tbodyTag = 'tbody';
    let tableContainerHeight = '100%';

    function resolveName(name) {
        let attributePrefix = 'data-scrollable-';
        let dataAttr = attributePrefix + name;
        let names = {
            'name': name,
            'dataAttribute': dataAttr,
            'selector': '[' + dataAttr + '="' + tableName + '"]'
        };
        return names
    }

    function select(name, child) {
        let additionalSelector = child ? ' ' + child : '';
        return document.querySelector(resolveName(name).selector + additionalSelector);
    }

    function selectAll(name, child) {
        let additionalSelector = child ? ' ' + child : '';
        return document.querySelectorAll(resolveName(name).selector + additionalSelector);
    }

    function setTableAttr(element, name) {
        element.setAttribute(resolveName(name).dataAttribute, tableName);
    }

    function initializeComponents() {
        let table = document.getElementById(tableId);
        setTableAttr(table, tableDataAttrName);

        let thead = select(tableDataAttrName, theadTag);
        setTableAttr(thead, tableHeadDataAttrName);

        let tbody = select(tableDataAttrName, tbodyTag);
        setTableAttr(tbody, tableBodyDataAttrName);

        let tableContainer = document.createElement(div);
        tableContainer.style.height = tableContainerHeight;
        setTableAttr(tableContainer, tableContainerDataAttrName);

        let tableParent = table.parentElement;
        tableParent.insertBefore(tableContainer, table);

        let tableHeadContainer = document.createElement(div);
        setTableAttr(tableHeadContainer, tableHeadContainerDataAttrName);
        tableContainer.appendChild(tableHeadContainer);

        let tableBodyContainer = document.createElement(div);
        setTableAttr(tableBodyContainer, tableBodyContainerDataAttrName);
        tableContainer.appendChild(tableBodyContainer);

        tableBodyContainer.appendChild(table);
    }

    function getTableCellWidthArray() {
        let cellWidthArray = [];
        let tableWidth = 0;

        let cells = selectAll(tableHeadDataAttrName, tr + ' ' + th);

        cells.forEach((el) => {
            tableWidth += el.offsetWidth;
        });

        cells.forEach((el) => {
            cellWidthArray.push((el.offsetWidth) * 100 / tableWidth);
        });

        return cellWidthArray;
    }

    function setTableCellsWith() {
        let theadRow = select(tableHeadDataAttrName, tr);
        let tbodyRows = selectAll(tableBodyDataAttrName, tr);

        let cellsWidthArray = getTableCellWidthArray();

        selectAll(tableHeadDataAttrName, th).forEach((el, index) => {
            let cellWidth = cellsWidthArray[index] + '%';
            el.style.width = cellWidth;
        });

        selectAll(tableBodyDataAttrName, tr + ' ' + td).forEach((el, index) => {
            let cellWidth = cellsWidthArray[index] + '%';
            el.style.width = cellWidth;
        });
    }

    function moveTableHeadToContainer() {
        let headTable = document.createElement(tableDataAttrName);
        setTableAttr(headTable, tableTemporaryHeadDataAttrName);
        select(tableHeadContainerDataAttrName).appendChild(headTable);
        select(tableHeadContainerDataAttrName, tableDataAttrName).appendChild(select(tableHeadDataAttrName));
    }

    function setScrollBodyHeight() {
        let tableBodyContainer = select(tableBodyContainerDataAttrName);
        tableBodyContainer.style.overflow = 'auto';
        tableBodyContainer.style.maxHeight = 'calc(100% - ' + select(tableHeadContainerDataAttrName).offsetHeight + 'px)';
    }

    function addHeadOffsetIfScroll() {
        let tableBodyContainerHeight = select(tableBodyContainerDataAttrName).offsetHeight;
        let tableBodyHeight = select(tableBodyDataAttrName).offsetHeight;

        let hightDiff = tableBodyContainerHeight - tableBodyHeight;

        if (hightDiff < 0) {
            select(tableHeadContainerDataAttrName).style.paddingRight = scrollWidth + 'px';
        }
    }

    ScrollableTable.prototype.resetTableHead = function() {
        select(tableDataAttrName).insertBefore(select(tableHeadDataAttrName), select(tableBodyDataAttrName));
        select(tableContainerDataAttrName).parentElement.insertBefore(select(tableDataAttrName), select(tableContainerDataAttrName));
        select(tableContainerDataAttrName).remove();
        selectAll(tableDataAttrName, tr + ' *').forEach((el) => {
            el.style.removeProperty('width');
        });
        select(tableDataAttrName).removeAttribute(resolveName(tableDataAttrName).dataAttribute);
        select(tableHeadDataAttrName).removeAttribute(resolveName(tableHeadDataAttrName).dataAttribute);
        select(tableBodyDataAttrName).removeAttribute(resolveName(tableBodyDataAttrName).dataAttribute);
    }

     ScrollableTable.prototype.createScrollableTable = function() {
        initializeComponents();
        setTableCellsWith();
        moveTableHeadToContainer();
        setScrollBodyHeight();
        addHeadOffsetIfScroll();
    }

    this.createScrollableTable();
}
