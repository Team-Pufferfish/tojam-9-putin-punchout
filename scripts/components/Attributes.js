var attributeHolder = {};

Crafty.c("Attributes",{
    init: function(){

    },

    assignAttribute: function(ID,attributeName, attributeValue){
        var component = this;
        if (!attributeHolder[ID]){
            attributeHolder[ID] = {};
        }

        if (!attributeHolder[ID][attributeName]){
            component.trigger(ID + ".attribute.created",
                {
                    name: attributeName,
                    value: attributeValue
                });
            attributeHolder[ID][attributeName] = attributeValue;
        } else {

            var oldVal = attributeHolder[ID][attributeName];
            var newVal = attributeHolder[ID][attributeName] = attributeValue;
            component.trigger(ID + ".attribute.changed",{
                name: attributeName,
                oldValue: oldVal,
                newValue: newVal

            });
        }
    },

    getAttribute: function(ID,attributeName){
        if (attributeHolder[ID] && attributeHolder[ID][attributeName]){
            return attributeHolder[ID][attributeName];
        } else {
            throw new Error("attribute does not exist");
        }
    }



});