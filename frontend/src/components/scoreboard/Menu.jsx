import React, { useState, useRef, useEffect } from "react";
import { MenuOutlined } from '@ant-design/icons';

export const Menu = ({ canchaName, setCanchaName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {  // si el menuRef existe y no contiene el evento target y esta abierto
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef, isOpen]);

  const handleClick = () => {
    setIsOpen(prev => !prev);
    console.log('click');
  };

  function handleClickSelected(value) {
    setCanchaName(value);
    setIsOpen(prev => !prev);
    console.log('ACA SE SUPONE QUE IRA LA LOGICA PARA QUE SE LE HAGA CLICK A UNA CANCHA Y SE CAMBIE DE CANCHA')
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      !isOpen ? setHidden('hidden') : null;
    }, 400); // Cierra el menú después de 5 segundos (ajusta el tiempo según tus necesidades)
    if (isOpen) {
      setHidden('');
    }else{
      
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const menuItems = [
    {
      'name': 'Cancha 1',
      'url': 'Cancha1'
    },
    {
      'name': 'Cancha 2',
      'url': 'Cancha2',
    },
    {
      'name': 'Cancha 3',
      'url': 'Cancha3',
    },
    {
      'name': 'Cancha 4',
      'url': 'Cancha4',
    },
    {
      'name': 'Cancha 5',
      'url': 'Cancha5',
    },
    {
      "name": "Tienda Online",
      "url": "https://www.amazon.com"
    }
  ]


  return (
    <section className="flex flex-row justify-center items-center gap-[25vw] medium_p:gap-[30px] relative">
      <p id="Saludo" className="font-bold text-2xl text-white whitespace-nowrap">Hola usuario</p>
      <article id="menu_icon" className="border-white border-[2.5px] p-3 cursor-pointer " onClick={() => handleClick()}>
        <MenuOutlined
        className="flex flex-col justify-center items-center "
          style={{
            fontSize: '30px',
            color: 'white'
          }}
        />
        <div>
        </div>
      </article>

      <article ref={menuRef}  className={` bg-white-primary w-[230px] absolute top-[70px] right-0 px-7 py-5 z-50 ${hidden} ${isOpen ? 'animate-blurred-fade-in ' : 'animate-fade-out'}`}>
        <ul>
          {menuItems.map((item, index) => {
            return item.name !== 'Tienda Online' ? (
              <li key={index} className={`cursor-pointer text-xl medium_p:text-2xl text-blue-back border border-t-0 border-l-0 border-r-0 ${index !== 0 ? 'mt-4' : ''} ${canchaName === item.url ? 'border-b-pink-primary text-pink-primary' : 'border-b-blue-back text-blueborder-b-blue-back'} hover:text-pink-400 hover:border-b-pink-primary`} onClick={() => handleClickSelected(item.url)}>
                {item.name}
              </li>
            ) : (
              <li key={index} target="_blank" className={`cursor-pointer text-xl medium_p:text-2xl text-blue-back border border-t-0 border-l-0 border-r-0  mt-4 ${index === 0 ? 'border-b-pink-primary text-pink-primary' : 'border-b-blue-back text-blueborder-b-blue-back'} hover:text-pink-400 hover:border-b-pink-primary`}>
                <a href={item.url} target="_blank">{item.name}</a>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
};
