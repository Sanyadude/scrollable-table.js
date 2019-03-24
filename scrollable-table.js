'use strict';

var ScrollableTable = function(tableId) {
    if (!tableId) {
        throw Error('table id is not defined');
        return;
    }
    let tableName = tableId;
    let tablePreffix = 'table';
    let tableDataAttrName = tablePreffix;
    let tableContainerDataAttrName = tablePreffix + '-container';
    let tableHeadContainerDataAttrName = tablePreffix + '-head-container';
    let tableBodyContainerDataAttrName = tablePreffix + '-body-container';
    let tableTemporaryHeadDataAttrName = tablePreffix + '-temporary-head';
    let tableHeadDataAttrName = tablePreffix + '-head';
    let tableBodyDataAttrName = tablePreffix + '-body';
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

    function createAndSetTableAttr(tag, attr) {
        let el = document.createElement(tag);
        setTableAttr(el, attr);
        return el;
    }

    function appendChildToElement(el, child) {
        el.appendChild(child);
    }

    function initializeComponents() {
        let table = document.getElementById(tableName);
        setTableAttr(table, tableDataAttrName);

        let thead = select(tableDataAttrName, theadTag);
        if (!thead) {
            throw Error('table with id - ' + tableName + ' doesn\'t have thead');
            return;
        }
        setTableAttr(thead, tableHeadDataAttrName);

        let tbody = select(tableDataAttrName, tbodyTag);
        if (!tbody) {
            throw Error('table with id - ' + tableName + ' doesn\'t have tbody');
            return;
        }
        setTableAttr(tbody, tableBodyDataAttrName);

        let tableContainer = createAndSetTableAttr(div, tableContainerDataAttrName);
        tableContainer.style.height = tableContainerHeight;

        let tableParent = table.parentElement;
        tableParent.insertBefore(tableContainer, table);

        let tableHeadContainer = createAndSetTableAttr(div, tableHeadContainerDataAttrName);
        appendChildToElement(tableContainer, tableHeadContainer);

        let tableBodyContainer = createAndSetTableAttr(div, tableBodyContainerDataAttrName);
        appendChildToElement(tableContainer, tableBodyContainer);

        appendChildToElement(tableBodyContainer, table);
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
        let headTable = createAndSetTableAttr(tableDataAttrName, tableTemporaryHeadDataAttrName);
        appendChildToElement(select(tableHeadContainerDataAttrName), headTable);
        appendChildToElement(select(tableHeadContainerDataAttrName, tableDataAttrName), select(tableHeadDataAttrName));
    }

    function setScrollBodyHeight() {
        let tableBodyContainer = select(tableBodyContainerDataAttrName);
        let tableBody = select(tableBodyContainerDataAttrName);
        tableBodyContainer.style.overflow = 'auto';
        tableBodyContainer.style.maxHeight = 'calc(100% - ' + select(tableHeadContainerDataAttrName).offsetHeight + 'px)';
    }

    function addHeadOffsetIfScroll() {
        let tableBodyContainer = select(tableBodyContainerDataAttrName);
        let tableBodyContainerHeight = tableBodyContainer.offsetHeight;
        let tableBodyContainerWidth = tableBodyContainer.offsetWidth;
        let tableWidth = select(tableDataAttrName).offsetWidth;
        let tableBodyHeight = select(tableBodyDataAttrName).offsetHeight;

        let hightDiff = tableBodyContainerHeight - tableBodyHeight;
        let scrollWidth = tableBodyContainerWidth - tableWidth;

        if (hightDiff < 0) {
            select(tableHeadContainerDataAttrName).style.paddingRight = scrollWidth + 'px';
        }
    }

    function resetScrollableTableComponents() {
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

    function isTableInitialized() {
        let table = document.getElementById(tableName);
        if (!table) {
            throw Error('can\'t find table with id - ' + tableName);
            return;
        }
        return table.hasAttribute(resolveName(tableDataAttrName).dataAttribute);
    }

    this.reset = function () {
        if (isTableInitialized()) {
            resetScrollableTableComponents();
        }
        return this;
    }

    this.init = function () {
        if (isTableInitialized()) {
            return;
        }
        initializeComponents();
        setTableCellsWith();
        moveTableHeadToContainer();
        setScrollBodyHeight();
        addHeadOffsetIfScroll();
        return this;
    }

    this.reinit = function () {
        this.reset().init();
        return this;
    }

    this.init();
};