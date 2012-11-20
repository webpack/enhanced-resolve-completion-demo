// executed while compiling by the bootstrap wpt-module
//  to get the (by-default) required bootstrap scripts and styles
// you can ever require("bootstrap/xxx"), i.e. require("bootstrap/affix")
//  to include more scripts, that are not included by default

// modify to your wishes
module.exports = {
	scripts: {
		affix:		true,
		alert:		true,
		button:		true,
		carousel:	true,
		collapse:	true,
		dropdown:	true,
		modal:		true,
		popover:	true,
		scrollspy:	true,
		tab:		true,
		tooltip:	true,
		transition:	true,
		typeahead:	true
	},
	styles: {
		accordion:					true,
		alerts:						true,
		breadcrumbs:				true,
		"button-groups":			true,
		buttons:					true,
		carousel:					true,
		close:						true,
		code:						true,
		"component-animations":		true,
		dropdowns:					true,
		forms:						true,
		grid:						true,
		"hero-unit":				true,
		"labels-badges":			true,
		layouts:					true,
		mixins:						true,
		media:						true,
		modals:						true,
		navbar:						true,
		navs:						true,
		pager:						true,
		pagination:					true,
		popovers:					true,
		"progress-bars":			true,
		"responsive-1200px-min":	true,
		"responsive-767px-max":		true,
		"responsive-768px-979px":	true,
		"responsive-navbar":		true,
		"responsive-utilities":		true,
		scaffolding:				true,
		sprites:					true,
		tables:						true,
		thumbnails:					true,
		tooltip:					true,
		type:						true,
		utilities:					true,
		wells:						true
	}
}