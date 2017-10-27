/**
 * An accelerometer object for detecting device orientation
 *  and motion (if supported)
 * 
 * Chrome 7+, Firefox 6+, IE11+, iOS Safari 4.0+, Android Browser 3.0, Blackberry 10.0
 *   http://caniuse.com/#feat=deviceorientation
 *   
 *   The DeviceOrientationEvent.alpha value represents the motion of the device around the z axis,
 *    represented in degrees with values ranging from 0 to 360.
 *    
 *    The DeviceOrientationEvent.beta value represents the motion of the device around the x axis,
 *    represented in degrees with values ranging from -180 to 180. 
 *    This represents a front to back motion of the device.
 *    
 *    The DeviceOrientationEvent.gamma value represents the motion of the device around the y axis,
 *    represented in degrees with values ranging from -90 to 90. 
 *    This represents a left to right motion of the device.
 *    
 * @property {boolean} supported If orientation events are supported in the current context
 */

var Accelerometer = function() {
    var self = this;
    self.supported = false;
    var absolute = null,
        alpha = null,
        beta = null,
        gamma = null,
        acceleration = null,
        accelerationIncludingGravity = null,
        rotationRate = null,
        interval = null;
        
    self.getAlpha = function() {
      return (alpha !== null) ? alpha : 0;
    };
    self.getBeta = function() {
      return (beta !== null) ? beta : 0;
    };
    self.getGamma = function() {
      return (gamma !== null) ? gamma : 0;
    };
    self.getAcceleration = function() {
      return (acceleration !== null) ? acceleration : 0;
    };
    self.getAccelerationIncludingGravity = function() {
      return (accelerationIncludingGravity !== null) ? accelerationIncludingGravity : 0;
    };
    self.getRotationRate = function() {
      return (rotationRate !== null) ? rotationRate : 0;
    };
    self.getInterval = function() {
      return (interval !== null) ? interval : 0;
    };
  
    if (!!window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion, true);
      self.supported = true;
    }
    if (!!window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
      self.supported = true;
    }
  
    window.addEventListener("compassneedscalibration", function(event) {
      self.supported = true;
      alert('Your compass needs calibrating!');
      event.preventDefault();
    }, true);
  
    function handleOrientation(event) {
      absolute = event.absolute;
      alpha = event.alpha;
      beta = event.beta;
      gamma = event.gamma;

      socket.emit('changeOrientation', event);
    }
    function handleMotion(event) {
      acceleration = accelerationIncludingGravity = rotationRate = {};
      acceleration.x = event.acceleration.x;
      acceleration.y = event.acceleration.y;
      acceleration.z = event.acceleration.z;
      accelerationIncludingGravity.x = event.accelerationIncludingGravity.x;
      accelerationIncludingGravity.y = event.accelerationIncludingGravity.y;
      accelerationIncludingGravity.z = event.accelerationIncludingGravity.z;
      rotationRate.alpha = event.rotationRate.alpha;
      rotationRate.beta = event.rotationRate.beta;
      rotationRate.gamma = event.rotationRate.gamma;
      interval = event.interval;
    }
  };