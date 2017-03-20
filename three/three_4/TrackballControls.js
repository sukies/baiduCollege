<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>百度前端学院——WebGL No. 2 - 光与影</title>
</head>
<body onload="init()">
<div id="container"></div>
<div id="init"></div>
<canvas id="canvas" width="500" height="500"></canvas>
</body>
<script src="../js/three.js"></script>
<script SRC="TrackballControls.js"></script>
<script>
    var camera, controls, scene, renderer;
    function init() {
        //渲染器
        renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("canvas")
        });
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        //场景
        scene = new THREE.Scene();
        //相机
        camera = new THREE.OrthographicCamera(-6, 6, 6, -6, 1, 100);
        camera.position.set(20, 20, 30);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        controls = new THREE.TrackballControls( camera, document.getElementById("canvas") );

        //材质
        var material = new THREE.MeshLambertMaterial({color: 0xcccccc});

        //底部
        var xz = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 10, 10),
            new THREE.MeshLambertMaterial({color: '#ffffff'}));
        xz.rotation.x = -Math.PI / 2;
        xz.position.y = -4;
        xz.receiveShadow = true;
        scene.add(xz);

//        长方体
        var cube = new THREE.Mesh(new THREE.CubeGeometry(8, 4, 4, 10, 10, 10), material);
        cube.castShadow = true;
        scene.add(cube);
        // 光
        var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
        light.position.set(-5, 8, 25);
        light.target = cube;
        light.castShadow = true;
        scene.add(light);

        var ambient = new THREE.AmbientLight(0x666666);
        scene.add(ambient);
        //渲染
        renderer.render(scene, camera);
        animate();
    }

    function animate() {
        requestAnimationFrame( animate, document.getElementById("canvas") );
        controls.update();
        renderer.render( scene, camera );
    }

</script>
</html>
