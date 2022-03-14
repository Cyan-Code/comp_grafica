import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Model3D = () => {
  
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;  
    const {clientWidth, clientHeight} = currentRef;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, clientWidth/clientHeight, 0.01, 1000);
    camera.position.z = 10;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(clientWidth, clientHeight);
    currentRef.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const material = new THREE.MeshBasicMaterial({color:0xffff00});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -3;

    const geometryShepre = new THREE.SphereGeometry(0.3, 22, 22);
    const materialShepre = new THREE.MeshBasicMaterial({color:0x0f2c64});
    const Shepre = new THREE.Mesh(geometryShepre, materialShepre);
    Shepre.position.x = 1;


    const geometryCone = new THREE.ConeGeometry( 0.5, 0.7, 10 );
    const materialCone = new THREE.MeshBasicMaterial( {color: 'rgb (0,100,0)'} );
    const cone = new THREE.Mesh( geometryCone, materialCone );
    cone.position.x = -1;

    const geometryCilinder = new THREE.CylinderGeometry( 0.4, 0.4, 0.4, 20 );
    const materialCilinder = new THREE.MeshBasicMaterial( {color: 'rgb(255, 0, 0)'} );
    const cylinder = new THREE.Mesh( geometryCilinder, materialCilinder );
    cylinder.position.x = 3;
    
    scene.add(cone);
    scene.add(cylinder);
    scene.add(Shepre);
    scene.add(cube);
    
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedtime = clock.getElapsedTime();
      cube.rotation.x = elapsedtime;
      cube.rotation.y = elapsedtime;
      cube.position.y = Math.sin(elapsedtime);
      Shepre.position.y = Math.sin((elapsedtime * -1));

      cylinder.rotation.x = elapsedtime;
      cylinder.rotation.y = elapsedtime;
      cylinder.position.y = Math.sin(elapsedtime);

      cone.rotation.x = elapsedtime;
      cone.rotation.y = elapsedtime;
      cone.position.y = Math.sin(elapsedtime);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    }
  }, [])
  

  return (
    <div ref={mountRef} style={{ width: '100%', height:'100vh' }}>
    </div>
  );
}
