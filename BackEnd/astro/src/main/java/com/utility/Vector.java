package com.utility;

import jakarta.persistence.Embeddable;

@Embeddable
public class Vector {
	public double x;
	public double y;
	public double z;
	
	public Vector() {}
	
	public Vector(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	
	@Override
	public String toString() {
		return "X axis: " + x + ", Y axis: " + y + ", Z axis: " + z;
	}

	@Override
	public boolean equals(Object obj) {
		if(!(obj instanceof Vector))
			return false;
		Vector v = (Vector)obj;
		if(x != this.x || y != this.y || z != this.z)
			return false;
		return true;
	}
	
	
	@Override
	public int hashCode() {
		return (int)Double.doubleToLongBits(x+y+z); 
	}

	public void sum(Vector other) {				//sum
		x += other.x;
		y += other.y;
		z += other.z;
	}
	
	public void scalMult(double t) {		//scalar multiplication
		x *= t;
		y *= t;
		z *= t;
	}
	
	
	public double distance(Vector other) {			// distance
		
		double d1;
		double d2;
		double d3;
		
        if (x == other.x)
            d1 = 0;
        else
            d1 = Math.pow(x - other.x, 2);
        if (this.y == other.y)
            d2 = 0;
        else
            d2 = Math.pow(y - other.y, 2);
        if (this.z == other.z)
            d3 = 0;
        else
            d3 = Math.pow(z - other.z, 2);
        if (d1 == 0 && d2 == 0 && d3 == 0)
            return 0;
        return Math.sqrt(d1 + d2 + d3);
	}

}
