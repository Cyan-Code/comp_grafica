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

    //TODO: Figures
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 0), new THREE.MeshBasicMaterial({color:0xffff00}));
    
    const circle1 = new THREE.Mesh(new THREE.CircleGeometry(0.2, 10), new THREE.MeshBasicMaterial({color:0xffff00}))
    circle1.position.y = -0.47;
    circle1.position.x = -0.8;

    const circle2 = new THREE.Mesh(new THREE.CircleGeometry(0.2, 10), new THREE.MeshBasicMaterial({color:0xffff00}))
    circle2.position.y = -0.47;
    circle2.position.x = 0.8;

    const escape = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0), new THREE.MeshBasicMaterial({color:0xffff00}))
    escape.position.y = 0.51;
    escape.position.x = -0.8;
    
    const nube1 = new THREE.Mesh(new THREE.CircleGeometry(0.03, 7), new THREE.MeshBasicMaterial({color:0xffff00}))
    nube1.position.y = 1;
    nube1.position.x = -0.8;

    const nube2 = new THREE.Mesh(new THREE.CircleGeometry(0.07, 7), new THREE.MeshBasicMaterial({color:0xffff00}))
    nube2.position.y = 2;
    nube2.position.x = -0.8;

    const nube3 = new THREE.Mesh(new THREE.CircleGeometry(0.1, 7), new THREE.MeshBasicMaterial({color:0xffff00}))
    nube3.position.y = 1.5;
    nube3.position.x = -0.8;

    //TODO: add Figures
    scene.add(cube);
    scene.add(circle1);
    scene.add(circle2);
    scene.add(escape);
    scene.add(nube1, nube2, nube3);

    //TODO: animate
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedtime = clock.getElapsedTime();
      //Todo: llantas
      circle1.rotation.z = (elapsedtime*-2);
      circle2.rotation.z = (elapsedtime*-2);

      //TODO: escape
      escape.position.y = 0.55+Math.sin(elapsedtime*5)/20;

      //TODO: nubes
      nube1.position.y = 0.9+Math.sin(elapsedtime*-15)/30;
      nube2.position.y = 1.2+Math.sin(elapsedtime*10)/30;
      nube3.position.y = 1.5+Math.sin(elapsedtime*-5)/30;

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
