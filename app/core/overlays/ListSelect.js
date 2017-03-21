define([
  'app',
  'backbone',
  'core/t',
  'core/BasePageView',
  'core/ListViewManager',
  'core/widgets/widgets'
], function (app, Backbone, __t, BasePageView, ListViewManager, Widgets) {

  return BasePageView.extend({
    headerOptions: {
      route: {
        title: 'Table View',
        isOverlay: true
      }
    },

    leftToolbar: function () {
      return [
        new Widgets.ButtonWidget({
          widgetOptions: {
            buttonId: 'addBtn',
            iconClass: 'check',
            buttonClass: 'primary',
            buttonText: __t('choose')
          },
          onClick: _.bind(function () {
            this.save();
          }, this)
        })
      ];
    },

    rightToolbar: function () {
      return [
        new Widgets.PaginatorWidget({
          collection: this.collection
        })
      ];
    },

    leftSecondaryToolbar: function() {
      return [
        new Widgets.VisibilityWidget({
          collection: this.collection,
          basePage: this
        }),
        new Widgets.FilterWidget({
          collection: this.collection,
          basePage: this
        })
      ];
    },

    rightSecondaryToolbar: function () {
      return [
        new Widgets.PaginationCountWidget({
          collection: this.collection
        })
      ];
    },

    events: {
      'click #addBtn': function () {
        this.save();
      }
    },

    save: function () {
      console.log("Save");
    },

    afterRender: function () {
      this.setView('#page-content', this.table);
    },

    itemClicked: function (event) {
      var $target = $(event.currentTarget);
      var $checkbox = $target.find('input');

      if ($checkbox.prop('checked')) {
        $checkbox.prop('checked', false);
      } else {
        $checkbox.prop('checked', true);
      }
    },

    initialize: function (options) {

      //Default to true
      if (options.selectable === undefined) {
        options.selectable = true;
      }

      this.table = ListViewManager.getInstance({
        collection: this.collection,
        selectable: options.selectable
      });

      var that = this;

      this.table.events = {
        'click td.js-check': function (event) {
          that.itemClicked(event);
        }
      };

      this.headerOptions.route.title = this.collection.table.id;
    }
  });
});
