AlloyEditor.editable('container', {
	add: {
		buttons: ['image', 'hline', 'table'],
		tabIndex: 2
	},
	styles: {
		selections: [{
			name: 'link',
			buttons: ['linkEdit'],
			test: AlloyEditor.SelectionTest.link
		}, {
			name: 'image',
			buttons: ['imageLeft', 'imageRight'],
			test: AlloyEditor.SelectionTest.image
		}, {
			name: 'text',
			buttons: ['styles', 'bold', 'italic', 'underline', 'ul', 'link'],
			test: AlloyEditor.SelectionTest.text
		}, {
			name: 'table',
			buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
			getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
			setPosition: AlloyEditor.SelectionSetPosition.table,
			test: AlloyEditor.SelectionTest.table
		}],
		tabIndex: 1
	}
});

AlloyEditor.editable('header', {});