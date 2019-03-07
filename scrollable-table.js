'use strict';

function ScrollableTable(tableId, tableName, scrollWidth) {
    tableName = tableName ? tableName : 'table';
    scrollWidth = scrollWidth ? scrollWidth : 17;

    function resolveName(name) {
        let attributePrefix = 'data-scrollable-';
        let dataAttrName = attributePrefix + name;
        let names = {
            'name': name,
            'dataAttribute': dataAttrName,
            'selector': '[' + dataAttrName + '="' + tableName + '"]'
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
        setTableAttr(table, 'table');

        let thead = select('table', 'thead');
        setTableAttr(thead, 'table-head');

        let tbody = select('table', 'tbody');
        setTableAttr(tbody, 'table-body');

        let tableContainer = document.createElement('div');
        tableContainer.style.height = '100%';
        setTableAttr(tableContainer, 'table-container');

        let tableParent = table.parentElement;
        tableParent.insertBefore(tableContainer, table);

        let tableHeadContainer = document.createElement('div');
        setTableAttr(tableHeadContainer, 'table-head-container');
        tableContainer.appendChild(tableHeadContainer);

        let tableBodyContainer = document.createElement('div');
        setTableAttr(tableBodyContainer, 'table-body-container');
        tableContainer.appendChild(tableBodyContainer);

        tableBodyContainer.appendChild(table);
    }

    function getTableCellWidthArray() {
        let cellWidthArray = [];
        let tableWidth = 0;

        let cells = selectAll('table-head', 'tr th');

        cells.forEach((el) => {
            tableWidth += el.offsetWidth;
        });

        cells.forEach((el) => {
            cellWidthArray.push((el.offsetWidth) * 100 / tableWidth);
        });

        return cellWidthArray;
    }

    function setTableCellsWith() {
        let theadRow = select('table-head', 'tr');
        let tbodyRows = selectAll('table-body', 'tr');

        let cellsWidthArray = getTableCellWidthArray();

        selectAll('table-head', 'th').forEach((el, index) => {
            let cellWidth = cellsWidthArray[index] + '%';
            el.style.width = cellWidth;
        });

        selectAll('table-body', 'tr td').forEach((el, index) => {
            let cellWidth = cellsWidthArray[index] + '%';
            el.style.width = cellWidth;
        });
    }

    function moveTableHeadToContainer() {
        let headTable = document.createElement('table');
        setTableAttr(headTable, 'table-temporary-head');
        select('table-head-container').appendChild(headTable);
        select('table-head-container', 'table').appendChild(select('table-head'));
    }

    function getScrollableBodyHeight() {
        let headersHeight = select('table-head-container').offsetHeight;

        let heightString = 'calc(100% - ' + headersHeight + 'px)';
        return heightString;
    }

    function setScrollBodyHeight() {
        let maxHeight = getScrollableBodyHeight();
        let tableBodyContainer = select('table-body-container');
        tableBodyContainer.style.overflow = 'auto';
        tableBodyContainer.style.maxHeight = maxHeight;
    }

    function addHeadOffsetIfScroll() {
        let tableBodyContainerHeight = select('table-body-container').offsetHeight;
        let tableBodyHeight = select('table-body').offsetHeight;

        let hightDiff = tableBodyContainerHeight - tableBodyHeight;

        if (hightDiff < 0) {
            select('table-head-container').style.paddingRight = scrollWidth + 'px';
        }
    }

    ScrollableTable.prototype.resetTableHead = function() {
        select('table').insertBefore(select('table-head'), select('table-body'));
        select('table-container').parentElement.insertBefore(select('table'), select('table-container'));
        select('table-container').remove();
        selectAll('table', 'tr *').forEach((el) => {
            el.style.removeProperty('width');
        });
        select('table').removeAttribute(resolveName('table').dataAttribute);
        select('table-head').removeAttribute(resolveName('table-head').dataAttribute);
        select('table-body').removeAttribute(resolveName('table-body').dataAttribute);
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
