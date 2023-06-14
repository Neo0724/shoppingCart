import { useState } from "react"

let items = [
    {
        name: "Macbook M1 Air 2020", 
        quantity: 1, 
        price: "3599 - 4999", 
        displayPrice: "3599 - 4999", 
        id: 0, 
        imgUrl:"m1air2020.jpg",
        storageSize: [
            { size: "256 GB", price: 3599, isSelected: false },
            { size: "512 GB", price: 4699, isSelected: false}
        ],
        color: [ 
            {color: "Silver",     isSelected: false}, 
            {color: "Space grey", isSelected: false},
            {color: "Gold",       isSelected: false}
        ],
        selectedColor: null,
        selectedStorage: null,
    },
    {
        name: "Macbook M1 Pro 2020", 
        quantity: 1, 
        price: "5699 - 6499", 
        displayPrice: "5699 - 6499", 
        id: 1, 
        imgUrl:"m1pro2020.jpg",
        storageSize: [
            { size: "256 GB", price: 5699, isSelected: false },
            { size: "512 GB", price: 6499, isSelected: false}
        ],
        color: [ 
            {color: "Silver",     isSelected: false}, 
            {color: "Space grey", isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,
       
    },
    {
        name: "Macbook M2 Air 2022", 
        quantity: 1, 
        price: "5199 - 6499", 
        displayPrice: "5199 - 6499", 
        id: 2, 
        imgUrl:"m2air2022.jpg",
        storageSize: [
            { size: "256 GB", price: 5199 , isSelected: false},
            { size: "512 GB", price: 6499 , isSelected: false}
        ],
        color: [ 
            {color: "Silver",    isSelected: false}, 
            {color: "Midnight",  isSelected: false},
            {color: "Starlight", isSelected: false},
            {color: "Space Grey",isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,

    },
    {
        name: "Apple iPad Air 5th Gen 10.9-inch with M1 Chip", 
        quantity: 1, 
        price: "2899 - 3649", 
        displayPrice: "2899 - 3649", 
        id: 3, 
        imgUrl:"ipadair5thgen.png",
        storageSize: [
            { size: "64 GB",  price: 2899  , isSelected: false},
            { size: "256 GB", price: 3649 , isSelected: false}
        ],
        color: [ 
            {color: "Pink",      isSelected: false}, 
            {color: "Purple",    isSelected: false}, 
            {color: "Blue",      isSelected: false}, 
            {color: "Starlight", isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,
    },
    {
        name: "iPhone 12", 
        quantity: 1, 
        price: "3199 - 3949", 
        displayPrice: "3199 - 3949", 
        id: 4, 
        imgUrl:"iphone12.jpg",
        storageSize: [
            { size: "64 GB",  price: 3199  , isSelected: false},
            { size: "128 GB", price: 3449 , isSelected: false},
            { size: "256 GB", price: 3949 , isSelected: false}
        ],
        color: [ 
            {color: "Blue",    isSelected: false}, 
            {color: "Purple",  isSelected: false},
            {color: "Green",   isSelected: false},
            {color: "Red",     isSelected: false},
            {color: "White",   isSelected: false}, 
            {color: "Black",   isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,

    },
    {
        name: "iPhone 13 Pro", 
        quantity: 1, 
        price: "7199", 
        displayPrice: "7199", 
        id: 5, 
        imgUrl:"iphone13pro.jpg",
        storageSize: [
            { size: "1 TB", price: 7199, isSelected: false },
        ],
        color: [ 
            {color: "Silver",       isSelected: false}, 
            {color: "Alpine Green", isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,

    },
    {
        name: "iPhone 14 Pro Max", 
        quantity: 1, 
        price: "5799 - 8299", 
        displayPrice: "5799 - 8299", 
        id: 6, 
        imgUrl:"iphone14promax.png",
        storageSize: [
            { size: "128 GB", price: 5799 , isSelected: false},
            { size: "256 GB", price: 6299 , isSelected: false},
            { size: "512 GB", price: 7299 , isSelected: false},
            { size: "1 TB", price: 8299   , isSelected: false},
        ],
        color: [ 
            {color: "Deep Purple",   isSelected: false}, 
            {color: "Gold",          isSelected: false}, 
            {color: "Silver",        isSelected: false},
            {color: "Space Black",   isSelected: false} 
        ],
        selectedColor: null,
        selectedStorage: null,
    },
    {
        name: "Apple Mac Mini M2 chip", 
        quantity: 1, 
        price: "2499 - 3299", 
        displayPrice: "2499 - 3299", 
        id: 7, 
        imgUrl:"macmini.jpg",
        storageSize: [
            { size: "256 GB", price: 2499 , isSelected: false},
            { size: "512 GB", price: 3299 , isSelected: false}
        ],
        color: [ 
            {color: "Silver", isSelected: false}
         ],
        selectedColor: null,
        selectedStorage: null,
    },
    {
        name: "Apple Pencil (2nd Generation)", 
        quantity: 1, 
        price: 449, 
        displayPrice: "449", 
        id: 8, 
        imgUrl:"applepencil2thgen.jpg",
        selectedColor: "White",
        selectedStorage: "None"

    }
]

export default function useProduct() {
    
    const [product, setProduct] = useState(items);

    return [product, setProduct]

}
