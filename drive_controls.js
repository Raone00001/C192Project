AFRAME.registerComponent('controls', {
    init: function () {
        var gameStateValue = this.el.getAttribute("game");

        if (gameStateValue == "play") {
            this.driveCar();
        }
    },

    isVelocityActive: function () {
        console.log("active");
        return Math.random() < 0.25;
    },

    driveCar: function () {
        var multiply = 10;
        var wheelRotation = 0;

        //Key-down Events
        window.addEventListener("keydown", function(e) {

            //Steering-Wheel Rotation & Right/Left Arrow Key-Down
            var wheel = this.document.querySelector("#control-wheel");

            if (e.code == "ArrowRight" && wheelRotation > -40) {
                wheelRotation -= 5;
                wheel.setAttribute("rotation", {x: 0, y: 0, z: wheelRotation});
            };

            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                wheelRotation += 5;
                wheel.setAttribute("rotation", {x: 0, y: 0, z: wheelRotation});
            };

            //Camera Movement Controls: Rotation/Direction On Right/Left Arrow Keydown
            var cameraRig = this.document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 10;
                cameraRig.setAttribute("rotation", {x: 0, y: cameraRotation, z: 0});
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.01});
            };

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 10;
                cameraRig.setAttribute("rotation", {x: 0, y: cameraRotation, z: 0});
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.01});
            };

            //Acceleration On Up-Arrow Keydown
            if (e.code == "ArrowUp") {
                multiply += 0.86

                if (multiply <= 160 && cameraPosition.z > -860) {
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.0086});
                    
                    var accelerateCar = this.document.querySelector("#control-accel");
                    accelerateCar.setAttribute("material", "color", "green");

                    var carSpeed = this.document.querySelector("#speed");
                    carSpeed.setAttribute("text", {value: multiply});
                };
            };

            //Stop/Break On Space Keydown
            if (e.code == "Space") {
                cameraRig.setAttribute("movement-controls", {"speed": 0});

                var stopCar = this.document.querySelector("#control-break");
                stopCar.setAttribute("material", "color", "red");
            };


        });

        //Key-Up Events
        window.addEventListener('keyup', function(e) {
            var cameraRig = this.document.querySelector("#camera-rig");
            
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            var cameraMoveControl = cameraRig.getAttribute("movement-controls");

            if (e.code == "Space") {
                var startCar = this.document.querySelector("#control-break");
                startCar.setAttribute("material", "color", "gray");
            };

            if (e.code == "ArrowUp") {
                if (multiply > 20) {
                    multiply -= 0.86
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.0086})
                };

                var accelerateCar = document.querySelector("#control-acce");
                accelerateCar.setAttribute("material", "color", "gray");
            };
        });
    
    }

});