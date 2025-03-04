package database

import (
	"database/sql"
	"fmt"
)

//	func Connection() (*sql.DB, error) {
//		var err error
//
//		db, err := sql.Open("mysql", "root:Pawan5379@tcp(127.0.0.1:3306)/employeemanagementsystem")
//		if err != nil {
//			fmt.Println("Error connecting to database")
//			panic(err.Error())
//		}
//		defer db.Close()
//		err = db.Ping()
//		if err != nil {
//			fmt.Println("Error pinging database:", err)
//			panic(err.Error())
//		}
//		return db, nil
//	}
func Connection() (*sql.DB, error) {
	var err error

	db, err := sql.Open("mysql", "root:password123@tcp(127.0.0.1:3306)/employeemanagementsystem")
	if err != nil {
		fmt.Println("Error connecting to database")
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		fmt.Println("Error pinging database:", err)
		return nil, err
	}

	return db, nil
}
