(function() {
  "use strict";

  var boolStringToBoolean = {
    "true": true,
    "false": false,
    null: false,
    "": true
  };
  var mix = function(obj, proto) {
    for (var prop in proto) {
      if (proto.hasOwnProperty(prop)) {
        obj[prop] = proto[prop];
      }
    }
  };
  var defaultOptions = {
    min: 0,
    max: 100,
    type: "defaults",
    value: 0
  };
  var booleanAttrs = ["active", "striped", "intermediate", "showActualValue", "showStatus"];
  var integerAttrs = ["value", "min", "max"];
  var progressBarTypes = ["success", "info", "warning", "danger", "default"];
  var BootProgressbarElementPrototype = Object.create(HTMLElement.prototype);
  mix(BootProgressbarElementPrototype, {
    createdCallback: function() {
      this.innerHTML = '<div class="progress">\
        <div class="progress-bar" role="progressbar">\
          <span class="status">\
            <span class="percentage"></span>\
            <span class="value"></span>\
          </span>\
        </div>\
      </div>';
      this.render();

    },
    attachedCallback: function() {},
    detachedCallback: function() {},
    attributeChangedCallback: function(attr, oldVal, newVal) {},
    getBooleanAttribute: function(attr) {
      var val = boolStringToBoolean[this.getAttribute(attr)];
      if (val === undefined) {
        return false;
      }
      return val;
    },
    getIntegerAttribute: function(attr) {
      var val = this.getAttribute(attr);
      if (val !== null) {
        return parseInt(val, 10);
      } else {
        return defaultOptions[attr];
      }
    },
    setIntegerAttribute: function(attr, newVal) {
      if (typeof newVal === "number") {
        if (this[attr] !== newVal + "") {
          this.setAttribute(attr, newVal);
          this.render();
        }
      }
    },
    toggle: function(attr) {
      if (booleanAttrs.indexOf(attr) !== -1) {
        this.setBooleanAttribute(attr, !this.getBooleanAttribute(attr));
      }
    },
    setBooleanAttribute: function(attr, newVal) {
      if (this[attr] !== newVal && typeof newVal === "boolean") {
        if (newVal === true) {
          this.setAttribute(attr, "");
        } else {
          this.removeAttribute(attr);
        }
        return true;
      } else {
        return false;
      }
    },
    render: function() {
      var p = ((this.value - this.min) / (this.max - this.min) * 100);
      if (p > 100) {
        p = 100;
      }
      if (p < 0) {
        p = 0;
      }
      this.querySelector(".progress-bar").style.width = p + "%";
      this.querySelector("span.status .percentage").innerHTML = window.parseInt(p * 10, 10) / 10 + "%";
      this.querySelector("span.status .value").innerHTML = this.value;
    }
  });
  booleanAttrs.map(function(v, i) {
    var Prop = {};
    Prop[v] = {
      get: function() {
        return this.getBooleanAttribute(v);
      },
      set: function(newVal) {
        this.setBooleanAttribute(v, newVal);
      }
    };
    Object.defineProperties(BootProgressbarElementPrototype, Prop);
  });
  integerAttrs.map(function(v, i) {
    var Prop = {};
    Prop[v] = {
      get: function() {
        return this.getIntegerAttribute(v);
      },
      set: function(newVal) {
        this.setIntegerAttribute(v, newVal);
      }
    };
    Object.defineProperties(BootProgressbarElementPrototype, Prop);
  });
  Object.defineProperties(BootProgressbarElementPrototype, {
    'type': {
      get: function() {
        var val = this.getAttribute('type');
        if (val !== null) {
          return val;
        } else {
          return defaultOptions.type;
        }
      },
      set: function(newVal) {
        if (this.type !== newVal) {
          if (progressBarTypes.indexOf(newVal) !== -1) {
            this.setAttribute('type', newVal);
          }
        }
      }
    }
  });
  window.BootProgressbarElement = document.registerElement('boot-progressbar', {
    prototype: BootProgressbarElementPrototype
  });

})();
