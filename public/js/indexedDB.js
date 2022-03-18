class I_DB {

    constructor(parent) {
        //
        this.DB_obj = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
        let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
        let dbVersion = 4;
        this.db_name = "peacock556";
        /* 
        window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1;
            Note: The recommended way to do this is assigning it to window.indexedDB,
            to avoid potential issues in the global scope when web browsers start 
            removing prefixes in their implementations.
            You can assign it to a varible, like var indexedDB… but then you have 
            to make sure that the code is contained within a function.
         */
        //this.transaction = this.db.transaction(["peacock556"], IDBTransaction.READ_WRITE);
        
        this.request = this.DB_obj.open(this.db_name,dbVersion);
        
        this.request.onerror = this.onerror;
        this.request.onsuccess = this.onsuccess;
        this.request.onupgradeneeded = this.onupgradeneeded;
        
        
        /*/
        if (!this.db.objectStoreNames.contains(db_name)) { // if there's no "books" store
            db.createObjectStore(db_name, {keyPath: 'id'}); // create it
        }
        /**/

    }
    addkey(){
        //
    }
    readkey(){
        //
    }
    delkey(){
        //
    }
    onblocked(e)
    {
        //

    }
    onerror(e)
    {
        //
        console.log("class indexedDB error");
    }
    onupgradeneeded(e)
    {
        //
        // Save the IDBDatabase interface
        this.db = e.target.result;

        // Create an objectStore for this database
        
        if(this.db.objectStoreNames.contains(this.db_name))
        {

        }
        //var objectStore = this.db.createObjectStore("tablename", { keyPath: "myKey" });
        
    }
    onsuccess(e)
    {
        //
        
        console.log("class indexedDB successed");
    }

}
export {
    I_DB as I_DB
}; 
/*
let createObjectStore = function (dataBase) {
    // Create an objectStore
    console.log("Creating objectStore")
    dataBase.createObjectStore("elephants");
};

let getImageFile = function () {
    // Create XHR
    var xhr = new XMLHttpRequest(),
        blob;

    xhr.open("GET", "elephant.png", true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            console.log("Image retrieved");
            
            // Blob as response
            blob = xhr.response;
            console.log("Blob:" + blob);

            // Put the received blob into IndexedDB
            putElephantInDb(blob);
        }
    }, false);
    // Send XHR
    xhr.send();
};

putElephantInDb = function (blob) {
    console.log("Putting elephants in IndexedDB");

    // Open a transaction to the database
    var transaction = db.transaction(["elephants"], IDBTransaction.READ_WRITE);

    // Put the blob into the dabase
    var put = transaction.objectStore("elephants").put(blob, "image");

    // Retrieve the file that was just stored
    transaction.objectStore("elephants").get("image").onsuccess = function (event) {
        var imgFile = event.target.result;
        console.log("Got elephant!" + imgFile);

        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // Create and revoke ObjectURL
        var imgURL = URL.createObjectURL(imgFile);

        // Set img src to ObjectURL
        var imgElephant = document.getElementById("elephant");
        imgElephant.setAttribute("src", imgURL);

        // Revoking ObjectURL
        URL.revokeObjectURL(imgURL);
    };
};

request.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database");
};

request.onsuccess = function (event) {
    console.log("Success creating/accessing IndexedDB database");
    db = request.result;

    db.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };

    // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    if (db.setVersion) {
        if (db.version != dbVersion) {
            var setVersion = db.setVersion(dbVersion);
            setVersion.onsuccess = function () {
                createObjectStore(db);
                getImageFile();
            };
        }
        else {
            getImageFile();
        }
    }
    else {
        getImageFile();
    }
}

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event) {
createObjectStore(event.target.result);
};
/**/
