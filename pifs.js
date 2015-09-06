function exp(p,ak){
  var i,j,p1,pt,r,ntp=25,tp=[],tp1=0;
  if(tp1==0){
    tp1=1;
    tp[0]=1.;
  }
  for(i=1;i<ntp;i++) tp[i]=2. * tp[i-1]
    if (ak == 1.) return 0.;

/*  Find the greatest power of two less than or equal to p. */

  for (i = 0; i < ntp; i++) if (tp[i] > p) break;

  pt = tp[i-1];
  p1 = p;
  r = 1.;

/*  Perform binary exponentiation algorithm modulo ak. */

  for (j = 1; j <= i; j++){
    if (p1 >= pt){
      r = 16. * r;
      r = r - (parseInt(r / ak)) * ak;
      p1 = p1 - pt;
    }
    pt = 0.5 * pt;
    if (pt >= 1.){
      r = r * r;
      r = r - (parseInt(r / ak))* ak;
    }
  }

  return r;
}
function series(m, id){

 var k;
 var ak,p,s,t;
 var eps = Math.pow(1,-17);
 s=0;

/*  Sum the series up to id. */

  for (k = 0; k < id; k++){
    ak = 8 * k + m;
    p = id - k;
    t = expm (p, ak);
    s = s + t / ak;
    s = s - parseInt(s);
  }

/*  Compute a few terms where k >= id. */

  for (k = id; k <= id + 100; k++){
    ak = 8 * k + m;
    t = Math.pow(16.,  (id - k)) / ak;
    if (t < eps) break;
    s = s + t;
    s = s - parseInt(s);
  }
  return s;
}