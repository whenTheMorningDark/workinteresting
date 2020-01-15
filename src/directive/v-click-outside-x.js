const CLICK = 'click';
const captureInstances = Object.create(null);
const nonCaptureInstances = Object.create(null);
const instancesList = [captureInstances, nonCaptureInstances];
const captureEventHandler = function (event) {
  /* eslint-disable-next-line babel/no-invalid-this */
  commonHandler(this, captureInstances, event);
};
const nonCaptureEventHandler = function (event) {
  /* eslint-disable-next-line babel/no-invalid-this */
  commonHandler(this, nonCaptureInstances, event);
};


// const getEventHandler = function _getEventHandler(useCapture) {
//   return useCapture ? captureEventHandler : nonCaptureEventHandler;
// };

const getEventHandler = function (useCapture) {
  return useCapture ? captureEventHandler : nonCaptureEventHandler;
}

const commonHandler = function (context, instances, event) {
  const {
    target
  } = event;

  const itemIteratee = function (item) {
    console.log(item)
    const {
      el
    } = item;

    if (el !== target && !el.contains(target)) {
      const {
        binding
      } = item;

      if (binding.modifiers.stop) {
        event.stopPropagation();
      }

      if (binding.modifiers.prevent) {
        event.preventDefault();
      }

      binding.value.call(context, event);
    }
  };
  const keysIteratee = function (eventName) {
    instances[eventName].forEach(itemIteratee);
  };
  Object.keys(instances).forEach(keysIteratee);
};

export const directive = Object.defineProperties({}, {
  bind: {
    value: function bind(el, binding) {
      if (typeof binding.value !== 'function') {
        throw new TypeError('Binding value must be a function.');
      }
      console.log(binding);
      let eventType;
      const modifiers = binding.modifiers;
      // console.log(modifiers);
      if (modifiers.click) eventType = 'click';
      else if (modifiers.mousedown) eventType = 'mousedown';
      else if (modifiers.touchstart) eventType = 'touchstart';
      else eventType = CLICK;

      const useCapture = binding.arg;
      const normalisedBinding = {
        ...binding,
        ...{
          modifiers: {
            ...{
              capture: false,
              prevent: false,
              stop: false,
            },
            ...binding.modifiers,
          },
        },
      };
      console.log(normalisedBinding)
      const instances = useCapture ? captureInstances : nonCaptureInstances;
      console.log(instances);
      if (!Array.isArray(instances[eventType])) {
        instances[eventType] = []
      }
      if (instances[eventType].push({
          el,
          binding: normalisedBinding
        }) === 1) {
        if (typeof document === 'object' && document) {
          console.log("asdasda")
          document.addEventListener(
            eventType,
            getEventHandler(useCapture),
            useCapture,
          );
        }
      }
    }
  },
  unbind: {
    value: function unbind(el) {
      console.log(el)
      const compareElements = function _compareElements(item) {
        return item.el !== el;
      };

      const instancesIteratee = function _instancesIteratee(instances) {
        const instanceKeys = Object.keys(instances);

        if (instanceKeys.length) {
          const useCapture = instances === captureInstances;

          const keysIteratee = function _keysIteratee(eventName) {
            const newInstance = instances[eventName].filter(compareElements);

            if (newInstance.length) {
              instances[eventName] = newInstance;
            } else {
              if (typeof document === 'object' && document) {
                document.removeEventListener(
                  eventName,
                  getEventHandler(useCapture),
                  useCapture,
                );
              }

              delete instances[eventName];
            }
          };

          instanceKeys.forEach(keysIteratee);
        }
      };

      instancesList.forEach(instancesIteratee);
    },
  }
})

// export const directive = {
//   bind: function bind(el, bind) {
//     console.log(el);
//     console.log(bind)
//   }
// }
console.log(directive)
