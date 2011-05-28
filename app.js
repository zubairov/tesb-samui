// Register namespaces and their corresponding paths to Ext.Loader
Ext.Loader.setPath({
    'AppName': 'SAMUI',
});


// Application's initialization
Ext.onReady(function() {
	Ext.ns('SAMUI');
	
	var pageSize = 20;

	SAMUI.Flos = Ext.define('Flow', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'flowID', type: 'string'},
			{name: 'port', type: 'string'},
			{name: 'operation', type: 'string'},
			{name: 'elapsed', type: 'int'},
			{name: 'timestamp', type: 'int'}
		]
	});
	
	var flowStore = Ext.create('Ext.data.Store', {
		model: 'Flow',
		proxy: {
			type: 'ajax',
			url : '/sam-server-war/api/v1.0/list',
			reader: {
				type: 'json',
				root: 'aggregated',
				totalProperty: 'count'
			}
		},
		autoLoad: false,
		pageSize: pageSize,
	});
	
	flowStore.load({
		params: {
			start: 0,
			limit: pageSize
		}
	});
	
	var grid = new Ext.grid.Panel({
		store: flowStore,
		width: '100%',
		heigh: 400,
		title: 'Talend ESB Service Activity Flows',
		columns: [
			{
				text: 'Flow ID',
				dataIndex: 'flowID',
				hidden: true,
				sortable: false
			},
			{
				text: 'Timestamp',
				dataIndex: 'timestamp',
				sortable: false,
				renderer: function(value) {
					return Ext.Date.format(new Date(value),'Y-m-d H:i:s');
				},
				flex: 1				
			},
			{
				text: 'Port',
				dataIndex: 'port',
				flex: 3,
				sortable: false
			},
			{
				text: 'Operation',
				dataIndex: 'operation',
				flex: 2,
				sortable: false
			},
			{
				text: 'Elapsed time',
				xtype: 'templatecolumn',
				tpl: '{elapsed} ms',
				sortable: false,
				flex: 1				
			}
		],
		dockedItems: [{
			xtype: 'pagingtoolbar',
			store: flowStore,   // same store GridPanel is using
			dock: 'bottom',
			displayInfo: true
	    }]
	});
		
	var contentPanel = {
         id: 'content-panel',
         region: 'center', // this is what makes this panel into a region within the containing layout
         layout: 'card',
         margins: '2 5 5 0',
         activeItem: 0,
         border: false,
         items: grid
    };	
    
    var detailsForm = Ext.create('Ext.form.Panel', {
    	id: 'details',
    	region: 'south',
    	margins: '2 5 5 0',
    	layout: 'card',
    	height: 200,
		title:'Flow details',
    	items: {
			xtype: 'fieldset',
			defaults: {
				width: 450,
				labelWidth: 120
			},
			defaultType: 'textfield',
			items: [
				{
					fieldLabel: 'Flow ID',
					name: 'flowID',
					readOnly: true
				},
				{
					fieldLabel: 'Timestamp',
					name: 'timestamp',
					readOnly: true
				},
				{
					fieldLabel: 'Operation',
					name: 'operation',
					readOnly: true
				},
				{
					fieldLabel: 'Port Type',
					name: 'port',
					readOnly: true
				},
				{
					fieldLabel: 'Elapsed time',
					name: 'elapsed',
					readOnly: true
				}
			]
    	}
    });
  
    
	grid.on('selectionchange', function(model, records) {
		if (records[0]) {
			console.log(records[0]);
			Ext.ComponentManager.get('details').loadRecord(records[0]);
		}
	});
    
	
	Ext.create('Ext.Viewport', {
        layout: 'border',
        title: 'Service Activity Monitoring UI',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1>Service Activity Monitoring UI</h1>',
            height: 30
        	}, contentPanel, detailsForm
        ],
        renderTo: Ext.getBody()
    });
});