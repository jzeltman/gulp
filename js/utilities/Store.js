/*
 * =============================================================================
 *  Store Class
 * =============================================================================
 *
 * =============================================================================
 *  Description
 * =============================================================================
 * The Store Class is used to scrape data from an HTML page
 *
 * This is particularly useful to pass data from back => front-end.
 * - It can be used to obviate a backend call for data.
 * - Store authored variables
 * - List data
 * - etc
 *
 *
 * =============================================================================
 *  Usage
 * =============================================================================
 * Example:
 *
 * var Store = require('store');
 *
 * var myStore = new Store();
 *
 *
 * =============================================================================
 *  Returned Data
 * =============================================================================
 * The Store will return an array of objects. Each object will have the name of 
 * the component ( string ), along with the instances ( array ) of the
 * component. The instances of the component will objects, with an id, and data
 * array. This data array will have all of the JSON scraped from the page
 * referenced for this instance of this component.
 * 
 *
 * =============================================================================
 *  Setup
 * =============================================================================
 * Script tag content MUST be in JSON format.
 *
 * Script tags on the page:
 * <script data-component="foo" data-component-instance="bar">
 *      // Your JSON data
 * </script>
 *
 */

module.exports = class Store {

    constructor(){

        this.AllData = [];

        var data          = this.getAllData();
        var componentList = this._list( data, 'componentName' );
        var components    = [];
        var self          = this;

        componentList.map( function( component ){
            components.push({
                name : component, 
                instances : self.getInstances( component )
            });
        });

        return {
            components
        };
    }

    /*
     * Filter an array by a passed key and value
     */
    _filter( arr, key, value ){
        return arr.filter( function( i ){
            return i[ key ] === value;
        });
    }

    /*
     * Returns a list matching the value passed of the
     */
    _list( arr, value ){

        var list = [];
        arr.map( function( inst ){

            var key = inst[ value ] || 0;
            if ( list.indexOf( key ) < 0 ){
                list.push( key );
            }
        });

        return list;
    }

    _cleanup( data ){
        return data.filter( function( item ){ 
            delete item.componentConfig;
            delete item.componentInstance;
            delete item.componentName
            return item;
        });
    }

    /*
     * Returns array of instances of the passed component name
     */
    getInstances( component ){

        var allInstanceData = this._filter( this.AllData, 'componentName', component );
        var instances       = this._list( allInstanceData, 'componentInstance' );
        var self            = this;
        
        return instances.map( function( inst ){

            var data   = self._filter( allInstanceData, 'componentInstance', inst );
            var config = self._filter( data, 'componentConfig', true );
                data   = self._cleanup( self._filter ( data, 'componentConfig', false ) );

            var obj = {
                id   : inst,
                data
            };

            // Add the config if it exists
            if ( config.length ){ obj.config = self._cleanup( config )[0]; }

            return obj;        
        });
    }

    /*
     * Scrapes the DOM for all script tags with the `data-component` attribute
     */
    getAllData(){

        // Grab the component script elements
        var componentScripts = document.querySelectorAll('[data-component]');

        // Parse the scripts from components and add their data to the Store
        for ( var i = 0; i < componentScripts.length; i++ ){

            // Localize variables
            var script = componentScripts[i],
                name   = script.dataset.component,
                config = script.dataset.componentConfig !== undefined,
                componentInstance = script.dataset.componentInstance,
                data   = JSON.parse( script.innerHTML );

                // Add to the data JSON object
                data.componentName = name;
                data.componentInstance = componentInstance;
                data.componentConfig = config;

            // Add the data to the store, and initialize the app
            this.AllData.push( data );

        }

        return this.AllData;

    }

};
