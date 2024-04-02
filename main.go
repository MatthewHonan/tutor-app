package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Username           string `json:"username"`
	Password           string `json:"password"`
	UserType           string `json:"userType"` //student or tutor
	City               string `json:"city"`
	State              string `json:"state"`
	University         string `json:"University"`
	FieldOfStudy       string `json:"fieldOfStudy"`
	LevelOfEducation   string `json:"levelOfEducation"`
	ProfilePicture     string `json:"profilePicture"`
	ProfileDescription string `json:"profileDescription"`
}

var db *sql.DB

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// If method is OPTIONS, short-circuit and return
		if r.Method == "OPTIONS" {
			return
		}

		// Otherwise, pass along to the next handler
		next.ServeHTTP(w, r)
	})
}
func signupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Printf("Error reading request body: %v\n", err)
			fmt.Printf("Request body: %s\n", body)
			http.Error(w, "Error reading request body",
				http.StatusInternalServerError)
			return
		}

		var user User
		err = json.Unmarshal(body, &user)
		if err != nil {

			http.Error(w, "Error unmarshalling request body",
				http.StatusBadRequest)
			return
		}

		// insert values
		insert, err := db.Query("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			user.Username, user.Password, user.UserType, user.City, user.State, user.University, user.FieldOfStudy, user.LevelOfEducation, user.ProfileDescription, user.ProfilePicture)
		if err != nil {
			fmt.Printf("Error inserting data into the database: %v\n", err)
			http.Error(w, "Error inserting data into the database",
				http.StatusInternalServerError)
			return
		}
		defer insert.Close()

		response := map[string]string{"message": "user signed up succesfully"}
		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Error converting result to JSON", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)

	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body",
				http.StatusInternalServerError)
			return
		}

		var user User
		err = json.Unmarshal(body, &user)
		if err != nil {
			fmt.Printf("Error unmarshalling request body: %v\n", err)
			fmt.Printf("Request body: %s\n", body)
			http.Error(w, "Error unmarshalling request body",
				http.StatusBadRequest)
			return
		}

		// Check if user exists in DB
		result := db.QueryRow("SELECT password FROM users WHERE username = ?", user.Username)
		var password string
		err = result.Scan(&password)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User does not exist",
					http.StatusUnauthorized)
				return
			} else {
				http.Error(w, "Error checking database",
					http.StatusInternalServerError)
				return
			}
		}
		if password == user.Password {
			// Create a map with a message
			res := map[string]string{"message": "User login successful"}

			// Convert map to json
			jsonRes, err := json.Marshal(res)
			if err != nil {
				http.Error(w, "Error converting result to json",
					http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonRes)
		} else {
			http.Error(w, "Invalid password",
				http.StatusUnauthorized)
			return
		}
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		userType := r.URL.Query().Get("userType")

		var rows *sql.Rows
		var err error

		if userType != "" {
			// Only retrieve users of the specified type
			rows, err = db.Query("SELECT username, password, userType, city, state, university, fieldOfStudy, levelOfEducation, profilePicture, profileDescription FROM users WHERE userType = ?", userType)
		} else {
			// Retrieve all users if no userType is specified
			rows, err = db.Query("SELECT * FROM users")
		}

		if err != nil {
			http.Error(w, "Error retrieving data from the database", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var users []User
		for rows.Next() {
			var user User
			err := rows.Scan(&user.Username, &user.Password, &user.UserType, &user.City, &user.State, &user.University, &user.FieldOfStudy, &user.LevelOfEducation, &user.ProfileDescription, &user.ProfilePicture)
			if err != nil {
				http.Error(w, "Error scanning database rows", http.StatusInternalServerError)
				return
			}

			users = append(users, user)
		}

		if err = rows.Err(); err != nil {
			http.Error(w, "Error with database rows", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}

}
func getLocationHandler(w http.ResponseWriter, r *http.Request) {
	location := r.URL.Query().Get("location")
	var rows *sql.Rows
	var err error
	if location != "" {
		rows, err = db.Query("SELECT username, password, userType, city, state, university, fieldOfStudy, levelOfEducation, profilePicture, profileDescription FROM users WHERE location = ?", location)
	} else {
		http.Error(w, "No users in location", http.StatusInternalServerError)
		return
	}
	if err != nil {
		http.Error(w, "Error retrieving data from the database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.Username, &user.Password, &user.UserType, &user.City, &user.State)
		if err != nil {
			http.Error(w, "Error scanning database rows", http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, "Error with database rows", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	// db connection
	var err error
	db, err = sql.Open("mysql", "root:admin@tcp(127.0.0.1:3306)/tutor_db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	mux := http.NewServeMux()
	// endpoint
	mux.HandleFunc("/signup", signupHandler)
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/users", getUsersHandler)
	mux.HandleFunc("/search", getLocationHandler)

	wrappedMux := corsMiddleware(mux)
	// start server
	http.ListenAndServe(":8080", wrappedMux)
}
