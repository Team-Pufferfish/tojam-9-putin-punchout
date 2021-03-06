var attributeHolder = {};

Crafty.c("Attributes",{
    init: function(){
        this.requires("Delay");

    },

    autoIncrementors: [],

    assignAttribute: function(ID,attributeName, attributeValue){
        var component = this;
        if (!attributeHolder[ID]){
            attributeHolder[ID] = {};
        }

        if (!attributeHolder[ID][attributeName]){
            Crafty.trigger(ID + ".attribute.created",
                {
                    name: attributeName,
                    value: attributeValue
                });
            attributeHolder[ID][attributeName] = attributeValue;
        } else {

            var oldVal = attributeHolder[ID][attributeName];
            var newVal = attributeHolder[ID][attributeName] = attributeValue;
            Crafty.trigger(ID + ".attribute.changed",{
                name: attributeName,
                oldValue: oldVal,
                newValue: newVal

            });
        }
    },

    changeAttribute: function(ID,attributeName,changeBy){
        if (attributeHolder[ID] && attributeHolder[ID][attributeName] !== null) {
           this.assignAttribute(ID,attributeName,attributeHolder[ID][attributeName] + changeBy);
        } else {
            throw new Error("attribute does not exist: " + ID + "." + attributeName);
        }
    },

    getAttribute: function(ID,attributeName) {
        if (attributeHolder[ID] && attributeHolder[ID][attributeName] !== null) {
            return attributeHolder[ID][attributeName];
        } else {
            throw new Error("attribute does not exist: " + ID + "." + attributeName);
        }
    },


    runAutoIncrementorLoop: function(delay){
        var component = this;
        component.delay(function(){
            for (var i = 0; i < component.autoIncrementors.length; i++){
                var inc = component.autoIncrementors[i];
                if (!inc.pause){
                    var currentValue = component.getAttribute(inc.ID,inc.attributeName);
                    var finalValue = currentValue + component.getAttribute(inc.ID,inc.incrementValue);

                    if (inc.maxValue && finalValue > component.getAttribute(inc.ID,inc.maxValue)){
                        finalValue = component.getAttribute(inc.ID,inc.maxValue);
                    }
                    component.assignAttribute(inc.ID,inc.attributeName,finalValue);
                }


            }
        },delay,-1);
    },

    clearAttributes: function(){
        this.autoIncrementors = [];
        attributeHolder = {};
    },
    createAttributeAutoIncrementor: function(ID,attributeName,incrementAttribute, maxValueAttribute){


        this.autoIncrementors.push({
            ID: ID,
            attributeName: attributeName,
            incrementValue: incrementAttribute,
            maxValue: maxValueAttribute,
            pause:false
        });

    },


    pauseAutoIncrementor: function(ID,attributeName){
        var incrementor = _.find(this.autoIncrementors,function(inc){return inc.ID === ID && inc.attributeName === attributeName});

        if (incrementor !== undefined){
            incrementor.pause = true;
        }

    }



});