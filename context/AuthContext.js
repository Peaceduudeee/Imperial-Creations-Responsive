import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  // We'll still keep role state for other components if needed…
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Use the returned role immediately
        const fetchedRole = await fetchUserRole(currentUser.uid);
        setRole(fetchedRole);
      } else {
        setUser(null);
        setRole("user");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch user role from Firestore and return it
  const fetchUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userRole = userSnap.data().role || "user";
        setRole(userRole);
        return userRole;
      }
      return "user";
    } catch (err) {
      console.error("Error fetching user role:", err);
      return "user";
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      // Create or update the user document
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          name: currentUser.displayName,
          email: currentUser.email,
          profilePicture: currentUser.photoURL,
          uid: currentUser.uid,
          role: "user",
        },
        { merge: true }
      );
      const fetchedRole = await fetchUserRole(currentUser.uid);
      toast.success("Logged in with Google!");
      router.push(fetchedRole === "admin" ? "/admin" : "/shop");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed.");
    }
  };

  // Register with Email (or phone)
  const registerWithEmail = async (identifier, password) => {
    try {
      if (!identifier || !password) {
        toast.error("Email/Phone and password are required!");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters!");
        return;
      }

      let email = identifier;
      let phone = null;
      if (!identifier.includes("@")) {
        phone = identifier.startsWith("+") ? identifier : "+91" + identifier;
        email = phone + "@example.com";
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        uid: currentUser.uid,
        role: "user",
        createdAt: new Date(),
        ...(phone ? { phone } : {}),
      });

      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed.");
    }
  };

  // Login with Email (or phone)
  const loginWithEmail = async (identifier, password, router) => {
    try {
      if (!identifier || !password) {
        toast.error("Email/Phone and password are required!");
        return;
      }

      let email = identifier;
      if (!identifier.includes("@")) {
        const phone = identifier.startsWith("+") ? identifier : "+91" + identifier;
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phone", "==", phone));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          toast.error("No account found with this phone. Please  register.");
          return;
        }
        const userData = snapshot.docs[0].data();
        if (!userData.email) {
          toast.error("No email associated with this account. Please  register with an email.");
          return;
        }
        email = userData.email;
      }

      // (Optional) Verify the account exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        toast.error("No account found. Please  register.");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      const fetchedRole = await fetchUserRole(currentUser.uid);
      toast.success("Logged in successfully!");
      router.push(fetchedRole === "admin" ? "/admin" : "/shop");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed.");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole("user");
      toast.info("Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}